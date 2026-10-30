import { useMutation } from '@tanstack/react-query'
import React from 'react'
import authService from '../../../services/authService'
import { notify } from '../../../utils/notify'

export default function useApplyOtpForgotPassword() {
    return useMutation(
        {
            mutationKey: ["reset-password"],
            mutationFn: authService.resetPassword,
            onError: () => notify.error("Thay đổi mật khẩu mới không thành công")
        }
    )
}
