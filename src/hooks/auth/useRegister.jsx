import { useEffect, useState } from "react";
import userService from "@/services/userService";
import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";

export default function useRegister() {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dialog, setDialog] = useState({ show: false, type: "", message: "" });

    useEffect(() => {
        setError(null);
    }, [email, username, password, confirmPassword]);

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Mật khẩu không khớp, vui lòng kiểm tra lại.");
            return;
        }

        const emailError = validateEmail(email);
        if (emailError) {
            setError(validateEmail(email));
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            setError(validatePassword(password));
            return;
        }

        try {
            const res = await userService.createUser({ email, username, password });
            console.log("✅ Đăng ký thành công:", res);
            setDialog({ show: true, type: "success", message: `🎉 Đăng ký thành công! Tài khoản: ${email}` });
            setError(null);
        } catch (error) {
            const msg = error.response?.data?.message || "Đã có lỗi xảy ra trong quá trình đăng ký.";
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error,
        loading,
        handleRegister,
        dialog, setDialog,
    };
}
