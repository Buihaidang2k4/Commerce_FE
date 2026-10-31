import apiBase from './apiBase';
import authService, { isAuthFailure } from './authService';
import useAuthStore from '../stores/useAuthStore';

const isAuthEndpoint = (url = '') => /\/auth\/(login|refresh|logout|introspect|forgot-password|reset-password)(?:[/?]|$)/.test(url)
  || /\/users\/registration(?:[/?]|$)/.test(url);

apiBase.interceptors.request.use((request) => {
  const state = authService.getSessionState();
  request._authVersion = state.version;
  request._authIdentity = state.identity;
  return request;
});

apiBase.interceptors.response.use(
  response => response,
  async error => {
    const request = error.config;
    if (!request || error.response?.status !== 401 || request._retry || request.skipAuthRefresh || isAuthEndpoint(request.url)) {
      return Promise.reject(error);
    }
    const current = authService.getSessionState();
    // Never replay an action from account A after another tab signed in as account B.
    if (request._authIdentity !== current.identity) return Promise.reject(error);
    request._retry = true;
    try {
      if (request._authVersion === current.version) {
        await authService.ensureSession({ identity: request._authIdentity });
      }
      if (request._authIdentity !== authService.getSessionState().identity) return Promise.reject(error);
    } catch (refreshError) {
      if (isAuthFailure(refreshError) && request._authIdentity === authService.getSessionState().identity) {
        useAuthStore.getState().invalidateSession();
      }
      return Promise.reject(refreshError);
    }
    return apiBase(request);
  },
);
