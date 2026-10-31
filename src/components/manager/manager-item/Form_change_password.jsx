import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import userService from '@/services/userService';
import useAuthStore from '@/stores/useAuthStore';
import validatePassword from '@/utils/validatePassword';
import getApiErrorMessage from '@/utils/authError';
import { notify } from '@/utils/Notify';

export default function Form_change_password({ onClose }) {
  const navigate = useNavigate();
  const user = useAuthStore(state => state.user);
  const [formData, setFormData] = useState({ oldPassword: '', newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const inFlight = useRef(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (inFlight.current || !user?.id) return;
    const { oldPassword, newPassword, confirmPassword } = formData;
    const validation = (!oldPassword ? 'Vui lòng nhập mật khẩu hiện tại.' : oldPassword.length > 72 ? 'Mật khẩu hiện tại tối đa 72 ký tự.' : '')
      || validatePassword(newPassword)
      || (newPassword !== confirmPassword ? 'Mật khẩu xác nhận không khớp.' : '')
      || (oldPassword === newPassword ? 'Mật khẩu mới không được trùng mật khẩu hiện tại.' : '');
    if (validation) { setError(validation); return; }
    inFlight.current = true;
    setSubmitting(true);
    setError('');
    try {
      await userService.changePassword(user.id, { oldPassword, newPassword, confirmPassword });
      // The API has revoked every session; do not refetch protected data with the old cookies.
      await useAuthStore.getState().logout({ silent: true });
      notify.success('Đổi mật khẩu thành công. Vui lòng đăng nhập lại.');
      onClose?.();
      navigate('/login', { replace: true, state: { email: user.email } });
    } catch (failure) {
      setError(getApiErrorMessage(failure, 'Chưa thể đổi mật khẩu. Vui lòng thử lại.'));
    } finally {
      inFlight.current = false;
      setSubmitting(false);
    }
  };

  if (!user?.id) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50" onClick={submitting ? undefined : onClose} />
      <div className="absolute right-0 top-20 h-full w-full max-w-md bg-white p-6 shadow-xl">
        <button type="button" onClick={onClose} disabled={submitting} aria-label="Đóng" className="absolute right-6 top-4">✕</button>
        <h3 className="mb-6 text-2xl font-bold">Đổi mật khẩu</h3>
        <form onSubmit={handleSubmit}>
          <fieldset disabled={submitting} className="flex flex-col gap-5">
            {[
              ['oldPassword', 'Mật khẩu hiện tại', 'current-password'],
              ['newPassword', 'Mật khẩu mới', 'new-password'],
              ['confirmPassword', 'Xác nhận mật khẩu mới', 'new-password'],
            ].map(([name, label, autoComplete]) => (
              <label key={name} className="flex flex-col gap-2 text-sm font-medium">
                {label}
                <input type="password" name={name} value={formData[name]} autoComplete={autoComplete} required maxLength={72}
                  minLength={name === 'oldPassword' ? undefined : 8}
                  onChange={event => { setFormData(previous => ({ ...previous, [name]: event.target.value })); setError(''); }}
                  className="rounded-lg border border-gray-300 px-4 py-3" />
              </label>
            ))}
            <p className="text-sm text-gray-500">Mật khẩu mới gồm 8–72 ký tự, chữ hoa, chữ thường, số và ký tự @$!%*?&.</p>
            {error && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</p>}
            <div className="flex justify-end gap-3">
              <button type="button" onClick={onClose} className="rounded-lg bg-gray-100 px-5 py-3">Hủy</button>
              <button type="submit" className="rounded-lg bg-blue-600 px-5 py-3 text-white">{submitting ? 'Đang xử lý...' : 'Đổi mật khẩu'}</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
