import { AUTH_PAGE_PATHS, AUTH_SESSION_EVENT } from '../constants/authConstants';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import useAuthStore from './useAuthStore';
import authService from '../services/authService';

export default function AuthSyncProvider({ children }) {
  const { pathname } = useLocation();
  const normalizedPath = pathname.replace(/\/+$/, '').toLowerCase() || '/';
  const isAuthPage = Object.values(AUTH_PAGE_PATHS).includes(normalizedPath);

  useEffect(() => {
    const store = useAuthStore.getState();
    if (isAuthPage) {
      // Auth forms are public: no introspect/refresh before registration or login.
      store.suspendSessionChecks();
    } else if (store.initialized && store.isLoggedIn && !store.authError) {
      store.startTokenWatcher();
    } else {
      store.initializeSession();
    }

    const unsubscribe = authService.subscribeSessionChanges(state => {
      if (state.kind === AUTH_SESSION_EVENT.LOGOUT || state.kind === AUTH_SESSION_EVENT.LOGIN) {
        useAuthStore.getState().invalidateSession();
      }
      if (!isAuthPage && state.kind !== AUTH_SESSION_EVENT.LOGOUT) {
        useAuthStore.getState().initializeSession({ force: true });
      }
    });
    let lastResume = 0;
    const resume = () => {
      if (isAuthPage || document.visibilityState === 'hidden' || Date.now() - lastResume < 5_000) return;
      lastResume = Date.now();
      useAuthStore.getState().retrySession();
    };
    window.addEventListener('online', resume);
    window.addEventListener('focus', resume);
    document.addEventListener('visibilitychange', resume);
    return () => {
      unsubscribe();
      window.removeEventListener('online', resume);
      window.removeEventListener('focus', resume);
      document.removeEventListener('visibilitychange', resume);
      useAuthStore.getState().stopTokenWatcher();
    };
  }, [isAuthPage]);

  return children;
}
