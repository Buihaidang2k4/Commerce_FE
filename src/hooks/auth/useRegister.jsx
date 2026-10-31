import { useRef, useState } from 'react';
import authService from '@/services/authService';
import validateEmail, { normalizeEmail } from '@/utils/validateEmail';
import validatePassword from '@/utils/validatePassword';
import getApiErrorMessage from '@/utils/authError';

export default function useRegister() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [dialog, setDialog] = useState({ show: false, type: '', message: '' });
  const inFlight = useRef(false);

  const handleRegister = async (event) => {
    event.preventDefault();
    if (inFlight.current || dialog.show) return;
    const address = normalizeEmail(email);
    const validation = validateEmail(address) || validatePassword(password)
      || (password !== confirmPassword ? 'Mật khẩu xác nhận không khớp.' : '');
    if (validation) { setError(validation); return; }
    inFlight.current = true;
    setLoading(true);
    setError('');
    try {
      await authService.register({ email: address, password });
      setEmail(address);
      setPassword('');
      setConfirmPassword('');
      setDialog({ show: true, type: 'success', message: `Đã tạo tài khoản ${address}. Vui lòng đăng nhập để tiếp tục.` });
    } catch (failure) {
      setError(getApiErrorMessage(failure, 'Chưa thể đăng ký tài khoản. Vui lòng thử lại.'));
    } finally {
      inFlight.current = false;
      setLoading(false);
    }
  };

  return { email, setEmail, password, setPassword, confirmPassword, setConfirmPassword, error, loading, dialog, setDialog, handleRegister };
}
