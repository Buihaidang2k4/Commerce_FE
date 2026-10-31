import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/image/mylogo.png';
import useForgotPassword from '../hooks/auth/forgot_password/useForgotPassword';
import useApplyOtpForgotPassword from '@/hooks/auth/forgot_password/useApplyOtpForgotPassword';
import { 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    ArrowLeft, 
    ShieldCheck, 
    Truck, 
    RotateCcw, 
    KeyRound, 
    Sparkles, 
    CheckCircle2,
    ShoppingBag
} from 'lucide-react';

export default function ForgotPasswordOtpPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const initialEmail = location.state?.email || '';

    const [formData, setFormData] = useState({
        email: initialEmail,
        otp: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successDialog, setSuccessDialog] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError('');
    };

    const { mutate: reSendOtp } = useForgotPassword();
    function handleClickResendOtp() {
        reSendOtp({ email: initialEmail });
    }

    const { mutateAsync: applyOtpForgotPassword } = useApplyOtpForgotPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (formData.newPassword !== formData.confirmPassword) {
            setError('Mật khẩu nhập lại không khớp.');
            setLoading(false);
            return;
        }

        if (formData.newPassword.length < 6) {
            setError('Mật khẩu mới phải có ít nhất 6 ký tự.');
            setLoading(false);
            return;
        }

        try {
            await applyOtpForgotPassword({
                email: formData.email,
                otp: formData.otp,
                newPassword: formData.newPassword
            });

            setSuccessDialog(true);
        } catch (err) {
            setError('Mã OTP không đúng hoặc đã hết hạn.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 font-sans text-slate-800">
            {/* --- BÊN TRÁI: FORM --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 xl:px-24 z-10">
                {/* Back button */}
                <div>
                    <Link 
                        to="/forgot-password" 
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span>Quay lại bước trước</span>
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto my-auto py-4">
                    {/* Header */}
                    <div className="mb-6">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={logo} alt="MyShop Logo" className="h-10 w-auto rounded-lg shadow-sm" />
                            <div className="h-9 w-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center font-bold">
                                <KeyRound className="w-5 h-5" />
                            </div>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Xác thực mã OTP
                        </h1>
                        <p className="text-slate-500 text-sm mt-2">
                            Nhập mã xác thực 6 số đã được gửi đến email của bạn và thiết lập mật khẩu mới.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Email field */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Email tài khoản</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition text-sm"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        {/* OTP Input */}
                        <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-semibold text-slate-700">Mã OTP (6 chữ số)</label>
                                <button
                                    type="button"
                                    onClick={() => handleClickResendOtp()}
                                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer transition hover:underline"
                                >
                                    Gửi lại mã?
                                </button>
                            </div>
                            <input
                                type="text"
                                inputMode="numeric"
                                pattern="[0-9]*"
                                maxLength={6}
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                required
                                placeholder="------"
                                className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 text-center text-2xl tracking-[0.4em] font-mono placeholder-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            />
                        </div>

                        {/* New Password */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Mật khẩu mới</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Tối thiểu 6 ký tự"
                                    className="w-full pl-11 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 text-sm"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                                    tabIndex={-1}
                                    aria-label="Hiện/ẩn mật khẩu"
                                >
                                    {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">Xác nhận mật khẩu mới</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    placeholder="Nhập lại mật khẩu mới"
                                    className={`w-full pl-11 pr-11 py-3 bg-white border rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 transition duration-200 text-sm ${
                                        formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                                            ? 'border-red-400 focus:ring-red-400'
                                            : 'border-slate-300 focus:ring-blue-500 focus:border-blue-500'
                                    }`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                                    tabIndex={-1}
                                    aria-label="Hiện/ẩn mật khẩu xác nhận"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2.5 animate-fadeIn">
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Submit Button */}
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
                                    <span>Đang xác thực & cập nhật...</span>
                                </>
                            ) : (
                                <>
                                    <KeyRound className="w-5 h-5" />
                                    <span>Cập nhật mật khẩu mới</span>
                                </>
                            )}
                        </button>
                    </form>
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
                        backgroundImage: `url('https://images.unsplash.com/photo-1614064641938-3e821efd85bd?q=80&w=2070&auto=format&fit=crop')`
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-blue-900/30"></div>

                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        XÁC THỰC AN TOÀN
                    </div>
                    <h2 className="text-3xl font-extrabold mb-3 leading-snug">
                        Tài khoản của bạn được bảo vệ toàn diện
                    </h2>
                    <p className="text-slate-300 text-base font-light leading-relaxed max-w-lg">
                        Sau khi đổi mật khẩu thành công, bạn có thể lập tức đăng nhập và tiếp tục trải nghiệm giỏ hàng mua sắm của mình.
                    </p>
                </div>
            </div>

            {/* --- SUCCESS MODAL --- */}
            {successDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-slate-100">
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 flex flex-col items-center justify-center text-white">
                            <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner mb-3">
                                <CheckCircle2 className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black">Thành công!</h3>
                            <p className="text-emerald-100 text-xs mt-1">Mật khẩu đã được cập nhật</p>
                        </div>

                        <div className="p-6 text-center">
                            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                Mật khẩu mới của bạn đã được lưu thành công. Bây giờ bạn có thể đăng nhập bằng mật khẩu mới này để tiếp tục mua sắm.
                            </p>

                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <span>Đăng nhập ngay</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
