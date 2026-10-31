import { useRef, useState } from 'react';
import useAuthStore from '@/stores/useAuthStore';
import validateEmail, { normalizeEmail } from '@/utils/validateEmail';
import getApiErrorMessage from '@/utils/authError';

export default function useLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const inFlight = useRef(false);
  const login = useAuthStore(state => state.login);

  const submitLogin = async (email, password) => {
    if (inFlight.current) return { success: false, cancelled: true };
    const address = normalizeEmail(email);
    const validation = validateEmail(address) || (!password ? 'Vui lòng nhập mật khẩu.' : password.length > 72 ? 'Mật khẩu tối đa 72 ký tự.' : '');
    if (validation) { setError(validation); return { success: false }; }
    inFlight.current = true;
    setLoading(true);
    setError('');
    try {
      const result = await login(address, password);
      if (!result.success && !result.cancelled) setError(getApiErrorMessage(result.error, 'Chưa thể đăng nhập. Vui lòng thử lại.'));
      return result;
    } catch (failure) {
      setError(getApiErrorMessage(failure, 'Chưa thể đăng nhập. Vui lòng thử lại.'));
      return { success: false };
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  };

  return { error, loading, submitLogin };
}
