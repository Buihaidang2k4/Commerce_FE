import { ROLES } from '../constants/authConstants';
import { AUTH_RETRY_DELAYS as RETRY_DELAYS } from '../constants/authConstants';
import { create } from 'zustand';
import { queryClient } from './queryClient';
import useOrderStore from './useOrderStore';
import authService, { isAuthFailure } from '@/services/authService';
import { notify } from '../utils/notify';
import { parseExpToMs } from '../utils/jwt';
import { fetchCurrentUser } from '../services/userService';

let timer;
let revision = 0;
let retryCount = 0;
let initializePromise;
let watcherPromise;

// Authentication is restored from HttpOnly cookies, never from cached roles/user data.
try { localStorage.removeItem('auth-storage'); } catch { /* Storage may be disabled. */ }

const emptySession = () => ({ user: null, role: null, isLoggedIn: false, exp: null });
const getUserRole = (user) => {
  const values = Array.isArray(user?.roles) ? user.roles : [user?.role];
  const roles = values.map(role => typeof role === 'string' ? role : role?.code || role?.roleName || role?.authority || role?.name)
    .filter(Boolean).map(role => role.replace(/^ROLE_/, ''));
  return roles.includes(ROLES.ADMIN) ? ROLES.ADMIN : roles.includes(ROLES.USER) ? ROLES.USER : roles[0] || null;
};
const cancelWork = () => {
  clearTimeout(timer);
  revision += 1;
  retryCount = 0;
  initializePromise = null;
  watcherPromise = null;
};
const scheduleRetry = (callback, expectedRevision) => {
  clearTimeout(timer);
  if (retryCount >= RETRY_DELAYS.length) return;
  timer = setTimeout(() => {
    if (revision === expectedRevision) callback();
  }, RETRY_DELAYS[retryCount++]);
};

const useAuthStore = create((set, get) => ({
  ...emptySession(),
  loading: false,
  initializing: false,
  initialized: false,
  authError: null,

  invalidateSession: () => {
    cancelWork();
    queryClient.clear();
    useOrderStore.getState().clearOrder();
    set({ ...emptySession(), loading: false, initializing: false, initialized: true, authError: null });
  },

  initializeSession: ({ force = false } = {}) => {
    if (initializePromise && !force) return initializePromise;
    clearTimeout(timer);
    const expectedRevision = ++revision;
    watcherPromise = null;
    const identity = authService.getSessionState().identity;
    set({ initializing: true, authError: null });
    const task = (async () => {
      try {
        const session = await authService.ensureSession({ identity });
        const user = await fetchCurrentUser();
        if (revision !== expectedRevision || identity !== authService.getSessionState().identity) return { success: false };
        const role = getUserRole(user);
        if (get().user?.id !== user.id || get().role !== role) queryClient.clear();
        retryCount = 0;
        set({ user, role, exp: parseExpToMs(session.exp), isLoggedIn: true, initialized: true, initializing: false, loading: false, authError: null });
        get().startTokenWatcher();
        return { success: true, role };
      } catch (error) {
        if (revision !== expectedRevision) return { success: false };
        if (isAuthFailure(error)) {
          get().invalidateSession();
        } else {
          set({ initialized: true, initializing: false, loading: false, authError: 'Chưa thể xác minh phiên đăng nhập. Vui lòng thử lại.' });
          scheduleRetry(() => get().initializeSession(), expectedRevision);
        }
        return { success: false, error };
      } finally {
        if (initializePromise === task) initializePromise = null;
      }
    })();
    initializePromise = task;
    return task;
  },

  retrySession: () => {
    if (get().loading || get().initializing) return;
    retryCount = 0;
    return get().initializeSession({ force: true });
  },

  login: async (email, password) => {
    cancelWork();
    const expectedRevision = revision;
    set({ ...emptySession(), loading: true, initializing: false, authError: null });
    try {
      await authService.login({ email, password });
      useOrderStore.getState().clearOrder();
      if (revision !== expectedRevision) return { success: false };
      const result = await get().initializeSession({ force: true });
      if (result.success) notify.success('Đăng nhập thành công');

      return result;
    } catch (error) {
      if (revision === expectedRevision) {
        set({ ...emptySession(), initialized: true, loading: false, authError: null });

      }
      return { success: false, error };
    }
  },

  logout: async ({ silent = false } = {}) => {
    get().invalidateSession();
    try {
      await authService.logout();
      return { success: true };
    } catch {
      if (!silent) notify.error('Đăng xuất chưa hoàn tất. Vui lòng thử lại.');
      return { success: false };
    }
  },

  suspendSessionChecks: () => {
    cancelWork();
    set({ initializing: false, loading: false, authError: null });
  },

  stopTokenWatcher: () => clearTimeout(timer),

  startTokenWatcher: ({ minValidityMs = 0 } = {}) => {
    if (!get().isLoggedIn || get().initializing) return;
    if (watcherPromise) return watcherPromise;
    clearTimeout(timer);
    const expectedRevision = revision;
    const identity = authService.getSessionState().identity;
    const task = (async () => {
      try {
        const session = await authService.ensureSession({ minValidityMs, identity });
        if (revision !== expectedRevision || identity !== authService.getSessionState().identity) return;
        const exp = parseExpToMs(session.exp);
        retryCount = 0;
        set({ exp, authError: null });
        const timeLeft = exp - Date.now();
        const lead = Math.min(60_000, Math.max(1_000, timeLeft / 2));
        timer = setTimeout(() => {
          if (revision === expectedRevision) get().startTokenWatcher({ minValidityMs: lead + 1_000 });
        }, Math.max(1_000, timeLeft - lead));
      } catch (error) {
        if (revision !== expectedRevision) return;
        if (isAuthFailure(error)) {
          get().invalidateSession();
        } else {
          set({ authError: 'Tạm thời chưa thể cập nhật phiên đăng nhập. Vui lòng thử lại.' });
          scheduleRetry(() => get().startTokenWatcher({ minValidityMs }), expectedRevision);
        }
      } finally {
        if (watcherPromise === task) watcherPromise = null;
      }
    })();
    watcherPromise = task;
    return task;
  },
}));

export default useAuthStore;
