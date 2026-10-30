import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

export default function PrivateRouter({ allowedRoles = [] }) {
  const { isLoggedIn, loading, role } = useAuthStore();

  if (loading) return null;

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
}
