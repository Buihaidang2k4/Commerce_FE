import { GoogleLogin } from "@react-oauth/google";
import authService from "../../services/authService";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
export default function GoogleLoginButton() {
    const navigate = useNavigate();
    const handleSuccess = async (res) => {
        try {
            await authService.loginGoogle(res.credential);
            alert("Đăng nhập Google thành công");
            navigate('/');
        } catch (error) {
            console.error("Lỗi đăng nhập Google:", error);
            alert("Đăng nhập Google thất bại");
        }
    };

    return (
        
        <GoogleLogin
            theme="outline"
            size="large"
            shape="rectangular"
            text="signin_with"
            locale="vi"
            onSuccess={handleSuccess}
            onError={() => console.log('Login Google Failed')}
        />
     
    )
}
