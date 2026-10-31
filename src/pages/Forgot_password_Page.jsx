import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image/mylogo.png';
import validateEmail, { normalizeEmail } from '@/utils/validateEmail';
import getApiErrorMessage from '@/utils/authError';
import useForgotPassword from '../hooks/auth/forgot_password/useForgotPassword';
import { 
    Mail, 
    ArrowLeft, 
    ShieldCheck, 
    Truck, 
    RotateCcw, 
    KeyRound, 
    Send,
    Sparkles
} from 'lucide-react';

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');
    const { mutateAsync: forgotPassword } = useForgotPassword();
    const inFlight = useRef(false);
    const [sentAt, setSentAt] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (inFlight.current) return;
        const address = normalizeEmail(email);
        const validation = validateEmail(address);
        if (validation) { setError(validation); return; }
        inFlight.current = true;
        setError('');
        setLoading(true);
        try {
            await forgotPassword({ email: address });
            setEmail(address);
            setSentAt(Date.now());
            setIsSubmitted(true);
        } catch (failure) {
            setError(getApiErrorMessage(failure, 'Chưa thể gửi mã khôi phục. Vui lòng thử lại.'));
        } finally {
            inFlight.current = false;
            setLoading(false);
        }
    };

    const handleClickOpenEmail = () => {
        navigate('/forgot-password-otp', { state: { email, otpSentAt: sentAt } });
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 font-sans text-slate-800">
            {/* --- BÊN TRÁI: FORM --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 xl:px-24 z-10">
                {/* Back to Login link */}
                <div>
                    <Link 
                        to="/login" 
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span>Quay lại Đăng nhập</span>
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto my-auto py-6">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={logo} alt="MyShop Logo" className="h-10 w-auto rounded-lg shadow-sm" />
                            <div className="h-9 w-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                                <KeyRound className="w-5 h-5" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Khôi phục mật khẩu
                        </h1>
                        <p className="text-slate-500 text-sm mt-2">
                            Đừng lo lắng! Nhập địa chỉ email tài khoản MyShop của bạn, chúng tôi sẽ gửi mã OTP để đặt lại mật khẩu.
                        </p>
                    </div>

                    {!isSubmitted ? (
                        /* --- FORM NHẬP EMAIL --- */
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <fieldset disabled={loading} className="contents">
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                                    Địa chỉ Email tài khoản <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                    maxLength={254}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="name@example.com"
                                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                    />
                                </div>
                            </div>

                            {error && (
                                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2.5">
                                    <span>{error}</span>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-0.5 flex items-center justify-center gap-2 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Đang gửi mã xác nhận...</span>
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-5 h-5" />
                                        <span>Gửi mã khôi phục</span>
                                    </>
                                )}
                            </button>
                            </fieldset>
                        </form>
                    ) : (
                        /* --- THÔNG BÁO GỬI THÀNH CÔNG --- */
                        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
                            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Mail className="w-7 h-7" />
                            </div>
                            <h2 className="text-xl font-bold text-slate-900 mb-2">Kiểm tra hộp thư đến</h2>
                            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                Nếu email thuộc tài khoản đang hoạt động, mã OTP sẽ được gửi đến:
                                <br />
                                <span className="font-semibold text-slate-900">{email}</span>
                            </p>

                            <div className="space-y-3">
                                <button
                                    onClick={handleClickOpenEmail}
                                    className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/25 transition"
                                >
                                    Tiếp tục nhập mã OTP
                                </button>

                                <button
                                    onClick={() => setIsSubmitted(false)}
                                    className="text-sm text-blue-600 hover:underline font-semibold"
                                >
                                    Đổi địa chỉ email
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Trust Badges */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
                    <div className="flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Bảo mật 100%</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                        <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Hỗ trợ 24/7</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                        <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>An tâm mua sắm</span>
                    </div>
                </div>
            </div>

            {/* --- BÊN PHẢI: BANNER --- */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[15s] hover:scale-105"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1555421689-4917475181f3?q=80&w=2070&auto=format&fit=crop')`
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-blue-900/30"></div>

                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        BẢO MẬT TÀI KHOẢN
                    </div>
                    <h2 className="text-3xl font-extrabold mb-3 leading-snug">
                        Bảo vệ an toàn cho tài khoản và đơn hàng của bạn
                    </h2>
                    <p className="text-slate-300 text-base font-light leading-relaxed max-w-lg">
                        MyShop áp dụng các tiêu chuẩn mã hóa tiên tiến nhất để đảm bảo thông tin cá nhân và dữ liệu thanh toán của bạn luôn được bảo vệ tuyệt đối.
                    </p>
                </div>
            </div>
        </div>
    );
}
