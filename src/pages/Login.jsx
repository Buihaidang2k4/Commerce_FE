import React, { useState } from 'react';
import logo from '../assets/image/mylogo.png';
import GoogleLoginButton from '../components/Login/GoogleLoginButton';
import useLogin from '../hooks/auth/login/useLogin';
import { Link } from 'react-router-dom';
import useLoginForm from '../hooks/auth/login/useLoginForm';
import useAuthRedirect from '../hooks/auth/login/useAuthRedirect';
import { 
    ShoppingBag, 
    Mail, 
    Lock, 
    Eye, 
    EyeOff, 
    ArrowLeft, 
    ShieldCheck, 
    Truck, 
    Sparkles, 
    Gift, 
    RotateCcw,
    CheckCircle2,
    Star
} from 'lucide-react';

export default function Login() {
    const { error, loading, submitLogin } = useLogin();
    const { email, password, setEmail, setPassword } = useLoginForm();
    const { redirectByRole } = useAuthRedirect();
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await submitLogin(email, password);
        if (result.success) {
            redirectByRole(result.role);
        }
    };

    return (
        <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 font-sans text-slate-800">
            {/* --- BÊN TRÁI: FORM ĐĂNG NHẬP --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between px-6 py-8 sm:px-12 lg:px-16 xl:px-24 z-10">
                {/* Top: Back to home */}
                <div>
                    <Link 
                        to="/" 
                        className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600 transition-colors group mb-6"
                    >
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                        <span>Về trang chủ MyShop</span>
                    </Link>
                </div>

                {/* Middle: Main Form Card */}
                <div className="max-w-md w-full mx-auto my-auto py-6">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-4">
                            <img src={logo} alt="MyShop Logo" className="h-10 w-auto rounded-lg shadow-sm" />
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
                                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                                Sàn TMĐT Uy Tín
                            </span>
                        </div>
                        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                            Đăng nhập tài khoản
                        </h1>
                        <p className="text-slate-500 text-sm mt-2">
                            Chào mừng bạn trở lại! Tiếp tục mua sắm hàng ngàn sản phẩm chính hãng với ưu đãi đặc quyền.
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" onSubmit={handleLogin} autoComplete="on">
                        {/* Email Input */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Email <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <input
                                    type="email"
                                    value={email}
                                    name="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="name@example.com"
                                    className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1.5">
                            <label className="block text-sm font-semibold text-slate-700">
                                Mật khẩu <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    name="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="current-password"
                                    placeholder="••••••••"
                                    className="w-full pl-11 pr-11 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 transition"
                                    tabIndex={-1}
                                    aria-label="Hiện/ẩn mật khẩu"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2.5 animate-fadeIn">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Remember & Forgot Pass */}
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center text-slate-600 cursor-pointer hover:text-slate-800 transition">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 mr-2"
                                />
                                Ghi nhớ đăng nhập
                            </label>
                            <Link 
                                to="/forgot-password" 
                                className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>

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
                                    <span>Đang đăng nhập...</span>
                                </>
                            ) : (
                                <>
                                    <ShoppingBag className="w-5 h-5" />
                                    <span>Đăng nhập mua sắm</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-7">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="px-4 bg-slate-50 text-slate-400 font-semibold tracking-wider">
                                Hoặc tiếp tục với
                            </span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="flex justify-center">
                        <div className="w-full flex justify-center">
                            <GoogleLoginButton />
                        </div>
                    </div>

                    {/* Footer Register link */}
                    <div className="mt-8 text-center text-sm text-slate-500">
                        Chưa có tài khoản MyShop?{" "}
                        <Link to="/register" className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition">
                            Đăng ký ngay (Nhận voucher 50K)
                        </Link>
                    </div>
                </div>

                {/* Bottom Trust Badges */}
                <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-2 text-center text-xs text-slate-500">
                    <div className="flex items-center justify-center gap-1.5">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>100% Chính hãng</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                        <Truck className="w-4 h-4 text-blue-600 shrink-0" />
                        <span>Giao hàng siêu tốc</span>
                    </div>
                    <div className="flex items-center justify-center gap-1.5">
                        <RotateCcw className="w-4 h-4 text-amber-600 shrink-0" />
                        <span>Đổi trả 7 ngày</span>
                    </div>
                </div>
            </div>

            {/* --- BÊN PHẢI: BANNER THƯƠNG MẠI ĐIỆN TỬ --- */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-900">
                {/* Background Image: Shopping / E-commerce lifestyle */}
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[15s] hover:scale-105"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop')`
                    }}
                ></div>

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-blue-900/30"></div>

                {/* Floating Badge 1: Voucher giảm giá */}
                <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3.5 transform hover:scale-105 transition duration-300">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-md">
                        <Gift className="w-6 h-6" />
                    </div>
                    <div>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full">
                            Ưu đãi thành viên
                        </span>
                        <p className="text-sm font-extrabold text-slate-900 mt-0.5">Giảm ngay 50.000đ</p>
                        <p className="text-[11px] text-slate-500">Áp dụng cho đơn hàng đầu tiên</p>
                    </div>
                </div>

                {/* Floating Badge 2: Customer Rating */}
                <div className="absolute bottom-44 left-10 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 transform hover:scale-105 transition duration-300">
                    <div className="flex -space-x-2 overflow-hidden">
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80" alt="Khách hàng" />
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80" alt="Khách hàng" />
                        <img className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80" alt="Khách hàng" />
                    </div>
                    <div>
                        <div className="flex items-center text-amber-500 text-xs gap-1">
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                ))}
                            </div>
                            <span className="font-bold text-slate-900 text-xs ml-1">4.9/5</span>
                        </div>
                        <p className="text-[11px] text-slate-500 font-medium">Hơn 50,000+ khách hàng hài lòng</p>
                    </div>
                </div>

                {/* Bottom Content / Narrative */}
                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-sm mb-4">
                        <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                        THƯƠNG MẠI ĐIỆN TỬ THẾ HỆ MỚI
                    </div>
                    <h2 className="text-3xl font-extrabold mb-3 leading-snug">
                        Khám phá thế giới mua sắm thông minh cùng MyShop
                    </h2>
                    <p className="text-slate-300 text-base font-light leading-relaxed max-w-lg">
                        Hàng triệu sản phẩm công nghệ, phụ kiện và phong cách sống với cam kết 100% chính hãng, bảo hành minh bạch và giao hàng tận nơi siêu tốc.
                    </p>
                </div>
            </div>
        </div>
    );
}
