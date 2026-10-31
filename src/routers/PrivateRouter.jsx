import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

export default function PrivateRouter({ allowedRoles = [] }) {
  const { isLoggedIn, initialized, initializing, loading, authError, retrySession, role } = useAuthStore();
  if (!initialized || loading || (initializing && !isLoggedIn)) return null;
  if (!isLoggedIn && authError) {
    return (
      <div role="alert" className="p-6 text-center">
        <p>{authError}</p>
        <button type="button" onClick={retrySession} className="mt-3 text-blue-600 underline">Thử lại</button>
      </div>
    );
  }
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (allowedRoles.length && !allowedRoles.includes(role)) return <Navigate to="/unauthorized" replace />;
  return <Outlet />;
}
