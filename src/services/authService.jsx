import { AUTH_ERROR_CODE } from '../constants/authConstants';
import { AUTH_SESSION_EVENT } from '../constants/authConstants';
import { AUTH } from '../constants/apiPathConstants';
import apiBase from './apiBase';
import { parseExpToMs } from '../utils/jwt';
import { getSessionState, publishSessionChange, subscribeSessionChanges, withSessionLock } from './authSession';



const sessionError = (code, message) => Object.assign(new Error(message), { code });
export const isAuthFailure = (error) => [401, 403].includes(error.response?.status) || error.code === AUTH_ERROR_CODE.SESSION_INVALID;

const readSession = async (signal) => {
  const response = await apiBase.post(AUTH.INTROSPECT, undefined, { skipAuthRefresh: true, signal });
  const session = response.data?.data;
  if (typeof session?.valid !== 'boolean' || (session.valid && !parseExpToMs(session.exp))) {
    throw sessionError(AUTH_ERROR_CODE.INVALID_RESPONSE, 'Phản hồi xác thực không hợp lệ.');
  }
  return session;
};

let refreshPromise = null;
const ensureSession = ({ minValidityMs = 0, identity = getSessionState().identity } = {}) => {
  if (!refreshPromise) {
    refreshPromise = withSessionLock(async (signal) => {
      const requireSameAccount = () => {
        if (identity !== getSessionState().identity) throw sessionError(AUTH_ERROR_CODE.SESSION_CHANGED, 'Phiên đăng nhập đã thay đổi.');
        if (signal?.aborted) throw sessionError(AUTH_ERROR_CODE.COORDINATION_UNAVAILABLE, 'Không thể đồng bộ phiên đăng nhập.');
      };
      requireSameAccount();
      if (getSessionState().kind === AUTH_SESSION_EVENT.LOGOUT) throw sessionError(AUTH_ERROR_CODE.SESSION_INVALID, 'Phiên đăng nhập đã kết thúc.');
      const current = await readSession(signal);
      requireSameAccount();
      // Another tab may already have refreshed while this request was waiting for the lock.
      if (current.valid && parseExpToMs(current.exp) - Date.now() > minValidityMs) return current;
      await apiBase.post(AUTH.REFRESH, undefined, { skipAuthRefresh: true, signal });
      requireSameAccount();
      const updated = await readSession(signal);
      requireSameAccount();
      if (!updated.valid || parseExpToMs(updated.exp) <= Date.now()) {
        throw sessionError(AUTH_ERROR_CODE.SESSION_INVALID, 'Trình duyệt chưa nhận được cookie xác thực hợp lệ.');
      }
      publishSessionChange(AUTH_SESSION_EVENT.REFRESH);
      return updated;
    }).finally(() => { refreshPromise = null; });
  }
  return refreshPromise;
};

const authService = {
  login: (data) => withSessionLock(async (signal) => {
    const response = await apiBase.post(AUTH.LOGIN, data, { skipAuthRefresh: true, signal });
    publishSessionChange(AUTH_SESSION_EVENT.LOGIN);
    return response;
  }),
  register: (data) => apiBase.post(AUTH.REGISTER, data, { skipAuthRefresh: true }),
  forgotPassword: (data) => apiBase.post(AUTH.FORGOT_PASSWORD, data, { timeout: 30_000 }),
  resetPassword: (data) => apiBase.put(AUTH.RESET_PASSWORD, data),
  logout: async () => {
    let published = false;
    try {
      return await withSessionLock(async (signal) => {
        try {
          return await apiBase.post(AUTH.LOGOUT, undefined, { skipAuthRefresh: true, signal });
        } finally {
          publishSessionChange(AUTH_SESSION_EVENT.LOGOUT);
          published = true;
        }
      });
    } finally {
      if (!published) publishSessionChange(AUTH_SESSION_EVENT.LOGOUT);
    }
  },
  refresh_token: ensureSession,
  ensureSession,
  getSessionState,
  subscribeSessionChanges,
  introspect: () => apiBase.post(AUTH.INTROSPECT),
  verifyToken: () => readSession(),
};

export default authService;
