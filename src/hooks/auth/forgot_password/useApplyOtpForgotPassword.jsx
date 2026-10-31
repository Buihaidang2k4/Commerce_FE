import { useMutation } from '@tanstack/react-query';
import authService from '@/services/authService';

export default function useApplyOtpForgotPassword() {
  return useMutation({ mutationKey: ['reset-password'], mutationFn: authService.resetPassword, retry: false });
}
