export const AUTH_SESSION_LOCK_NAME = 'myshop-auth-session';
export const AUTH_SESSION_STATE_KEY = 'myshop-auth-session-state';
export const AUTH_SESSION_LEASE_MS = 60_000;
export const AUTH_SESSION_RENEW_MS = 10_000;
export const AUTH_SESSION_WAIT_MS = 20_000;
export const AUTH_SESSION_POLL_MS = 100;
export const AUTH_SESSION_POLL_JITTER_MS = 150;
export const AUTH_COORDINATION_DB_NAME = 'myshop-auth-coordination';
export const AUTH_COORDINATION_STORE = 'locks';
export const AUTH_RETRY_DELAYS = Object.freeze([1_000, 3_000, 10_000]);
export const AUTH_SESSION_EVENT = Object.freeze({ INITIAL: 'initial', LOGIN: 'login', REFRESH: 'refresh', LOGOUT: 'logout' });
export const AUTH_LEASE_OPERATION = Object.freeze({ ACQUIRE: 'acquire', RENEW: 'renew', RELEASE: 'release' });

export const ROLES = Object.freeze({
  USER: 'USER',
  ADMIN: 'ADMIN',
});

export const AUTH_ERROR_CODE = Object.freeze({
  SESSION_INVALID: 'AUTH_SESSION_INVALID',
  SESSION_CHANGED: 'AUTH_SESSION_CHANGED',
  INVALID_RESPONSE: 'AUTH_INVALID_RESPONSE',
  COORDINATION_UNAVAILABLE: 'AUTH_COORDINATION_UNAVAILABLE',
});

export const AUTH_PAGE_PATHS = Object.freeze({
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/forgot-password-otp',
});
