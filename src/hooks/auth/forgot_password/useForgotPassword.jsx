import { useMutation } from '@tanstack/react-query';
import authService from '@/services/authService';

export default function useForgotPassword() {
  return useMutation({ mutationKey: ['forgot-password'], mutationFn: authService.forgotPassword, retry: false });
}
