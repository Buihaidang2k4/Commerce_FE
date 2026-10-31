import { AUTH_ERROR_CODE } from '../constants/authConstants';
import {
  AUTH_SESSION_LOCK_NAME as LOCK_NAME, AUTH_SESSION_STATE_KEY as STATE_KEY, AUTH_SESSION_LEASE_MS as LEASE_MS,
  AUTH_SESSION_RENEW_MS, AUTH_SESSION_WAIT_MS, AUTH_SESSION_POLL_MS, AUTH_SESSION_POLL_JITTER_MS,
  AUTH_COORDINATION_DB_NAME, AUTH_COORDINATION_STORE, AUTH_SESSION_EVENT, AUTH_LEASE_OPERATION,
} from '../constants/authConstants';

const channel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel(LOCK_NAME) : null;
let databasePromise;
let memoryState = { version: AUTH_SESSION_EVENT.INITIAL, identity: AUTH_SESSION_EVENT.INITIAL, kind: AUTH_SESSION_EVENT.INITIAL, sequence: 0 };

const coordinationError = () => Object.assign(new Error('Không thể đồng bộ phiên giữa các tab. Vui lòng thử lại.'), { code: AUTH_ERROR_CODE.COORDINATION_UNAVAILABLE });
const uniqueId = () => globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;

export const getSessionState = () => {
  try {
    const state = JSON.parse(localStorage.getItem(STATE_KEY));
    if (state && typeof state.version === 'string' && typeof state.identity === 'string') return state;
  } catch { /* Storage can be disabled by the browser. */ }
  return memoryState;
};

export const publishSessionChange = (kind) => {
  const previous = getSessionState();
  const version = uniqueId();
  memoryState = { version, identity: kind === AUTH_SESSION_EVENT.REFRESH ? previous.identity : version, kind, sequence: (previous.sequence || 0) + 1 };
  try { localStorage.setItem(STATE_KEY, JSON.stringify(memoryState)); } catch { /* BroadcastChannel remains available. */ }
  channel?.postMessage(memoryState);
};

export const subscribeSessionChanges = (listener) => {
  let lastVersion = getSessionState().version;
  const receive = (state) => {
    if (!state || typeof state.version !== 'string' || typeof state.identity !== 'string' || state.version === lastVersion) return;
    // Storage and BroadcastChannel events can arrive in a different order.
    if ((state.sequence || 0) < Math.max(getSessionState().sequence || 0, memoryState.sequence || 0)) return;
    lastVersion = state.version;
    memoryState = state;
    listener(state);
  };
  const onStorage = (event) => {
    if (event.key !== STATE_KEY) return;
    try { receive(JSON.parse(event.newValue)); } catch { /* Ignore invalid metadata. */ }
  };
  const onMessage = (event) => receive(event.data);
  window.addEventListener('storage', onStorage);
  channel?.addEventListener('message', onMessage);
  return () => {
    window.removeEventListener('storage', onStorage);
    channel?.removeEventListener('message', onMessage);
  };
};

const openDatabase = () => {
  if (!databasePromise) {
    databasePromise = new Promise((resolve, reject) => {
      if (!globalThis.indexedDB) return reject(coordinationError());
      const request = indexedDB.open(AUTH_COORDINATION_DB_NAME, 1);
      request.onupgradeneeded = () => request.result.createObjectStore(AUTH_COORDINATION_STORE);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(coordinationError());
      request.onblocked = () => reject(coordinationError());
    }).catch((error) => { databasePromise = null; throw error; });
  }
  return databasePromise;
};

// IndexedDB read/write transactions make acquisition atomic across tabs.
const updateLease = async (owner, operation) => {
  const database = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = database.transaction(AUTH_COORDINATION_STORE, 'readwrite');
    const store = transaction.objectStore(AUTH_COORDINATION_STORE);
    const request = store.get(LOCK_NAME);
    let acquired = false;
    request.onsuccess = () => {
      const current = request.result;
      if (operation === AUTH_LEASE_OPERATION.RELEASE) {
        if (current?.owner === owner) store.delete(LOCK_NAME);
      } else if ((operation === AUTH_LEASE_OPERATION.ACQUIRE && (!current || current.expiresAt <= Date.now())) || current?.owner === owner) {
        store.put({ owner, expiresAt: Date.now() + LEASE_MS }, LOCK_NAME);
        acquired = true;
      }
    };
    transaction.oncomplete = () => resolve(acquired);
    transaction.onerror = () => reject(coordinationError());
    transaction.onabort = () => reject(coordinationError());
  });
};

export const withSessionLock = async (operation) => {
  if (globalThis.navigator?.locks) return navigator.locks.request(LOCK_NAME, () => operation());
  const owner = uniqueId();
  const deadline = Date.now() + AUTH_SESSION_WAIT_MS;
  while (!await updateLease(owner, AUTH_LEASE_OPERATION.ACQUIRE)) {
    if (Date.now() >= deadline) throw coordinationError();
    await new Promise((resolve) => setTimeout(resolve, AUTH_SESSION_POLL_MS + Math.random() * AUTH_SESSION_POLL_JITTER_MS));
  }
  const controller = new AbortController();
  const renewal = setInterval(() => {
    updateLease(owner, AUTH_LEASE_OPERATION.RENEW).then((owned) => {
      if (!owned) controller.abort();
    }).catch(() => controller.abort());
  }, AUTH_SESSION_RENEW_MS);
  try {
    return await operation(controller.signal);
  } finally {
    clearInterval(renewal);
    await updateLease(owner, AUTH_LEASE_OPERATION.RELEASE).catch(() => {});
  }
};
