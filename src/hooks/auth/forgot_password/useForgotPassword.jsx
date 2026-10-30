import { useMutation } from "@tanstack/react-query";
import authService from "../../../services/authService";
import { notify } from "../../../utils/notify";
export default function useForgotPassword() {
    return useMutation(
        {
            mutationKey: ["forgot-password"],
            mutationFn: authService.forgotPassword,
            onSuccess: () => notify.success("Vui lòng kiểm tra email!"),
            onError: () => notify.error("Email không tồn tại hoặc có lỗi xảy ra.")
        }
    )
}
