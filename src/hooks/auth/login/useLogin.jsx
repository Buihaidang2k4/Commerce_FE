import { useState } from 'react';
import useAuthStore from '@/stores/useAuthStore';

export default function useLogin() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const submitLogin = async (email, password) => {
    setLoading(true);
    setError('');

    const result = await login(email, password);

    setLoading(false);

    if (!result.success) {
      setError("Đăng nhập thất bại vui lòng kiểm tra lại thông tin.");
      console.error(result)
    }
    return result;
  }

  return { error, loading, submitLogin }
}