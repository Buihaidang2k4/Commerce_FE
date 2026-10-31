import { useState } from 'react';
import logo from "@/assets/image/mylogo.png";
import useRegister from "@/hooks/auth/useRegister";
import { Link } from "react-router-dom";
import { 
    User, 
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
    ShoppingBag,
    Percent
} from 'lucide-react';

export default function Register() {
    const {
        email, setEmail,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error, handleRegister,
        loading, dialog,
    } = useRegister();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    return (
        <>
            <div className="min-h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/20 to-indigo-50/30 font-sans text-slate-800">
                {/* --- BÊN TRÁI: FORM ĐĂNG KÝ --- */}
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
                    <div className="max-w-md w-full mx-auto my-auto py-4">
                        {/* Header */}
                        <div className="mb-6">
                            <div className="flex items-center gap-3 mb-4">
                                <img src={logo} alt="MyShop Logo" className="h-10 w-auto rounded-lg shadow-sm" />
                                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700 border border-emerald-200">
                                    <Gift className="w-3.5 h-3.5 text-emerald-600" />
                                    Tặng Voucher 500K
                                </span>
                            </div>
                            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                                Đăng ký tài khoản mới
                            </h1>
                            <p className="text-slate-500 text-sm mt-2">
                                Tham gia MyShop ngay hôm nay để nhận ưu đãi chào mừng và trải nghiệm mua sắm tiện lợi nhất.
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-4" onSubmit={handleRegister} autoComplete="on">
                            <fieldset disabled={loading || dialog.show} className="contents">
                            {/* Email Input */}
                            <div className="space-y-1.5">
                                <label htmlFor="email" className="block text-sm font-semibold text-slate-700">
                                    Địa chỉ Email <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                        <Mail className="w-5 h-5" />
                                    </div>
                                    <input
                                        id="email"
                                        type="email"
                                    maxLength={254}
                                        name="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        autoComplete="email"
                                        placeholder="name@example.com"
                                        className="w-full pl-11 pr-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                    />
                                </div>
                            </div>

                            {/* Password & Confirm Password (Grid) */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {/* Password */}
                                <div className="space-y-1.5">
                                    <label htmlFor="password" className="block text-sm font-semibold text-slate-700">
                                        Mật khẩu <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                            autoComplete="new-password" minLength={8} maxLength={72}
                                            placeholder="••••••••"
                                            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                                            tabIndex={-1}
                                            aria-label="Hiện/ẩn mật khẩu"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-1.5">
                                    <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700">
                                        Xác nhận <span className="text-red-500">*</span>
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                                            <Lock className="w-5 h-5" />
                                        </div>
                                        <input
                                            id="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                            required
                                            autoComplete="new-password" minLength={8} maxLength={72}
                                            placeholder="••••••••"
                                            className="w-full pl-11 pr-10 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm transition duration-200"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition"
                                            tabIndex={-1}
                                            aria-label="Hiện/ẩn xác nhận mật khẩu"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Member Benefits Perks */}
                            <div className="bg-blue-50/70 border border-blue-200/60 rounded-xl p-3 space-y-1.5 text-xs text-slate-600">
                                <div className="flex items-center gap-2 font-medium text-blue-900">
                                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                    <span>Tự động nhận voucher giảm giá 50.000đ khi mở tài khoản</span>
                                </div>
                                <div className="flex items-center gap-2 font-medium text-blue-900">
                                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                    <span>Tích điểm đổi quà và nâng hạng thành viên VIP trọn đời</span>
                                </div>
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm flex items-start gap-2.5 animate-fadeIn">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0 mt-0.5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
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
                                        <span>Đang tạo tài khoản...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-5 h-5" />
                                        <span>Tạo tài khoản</span>
                                    </>
                                )}
                            </button>

                            {/* Footer Link */}
                            <p className="mt-4 text-center text-sm text-slate-500">
                                Đã có tài khoản MyShop?{" "}
                                <Link to="/login" state={{ email }} className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition ml-1">
                                    Đăng nhập ngay
                                </Link>
                            </p>
                            </fieldset>
                        </form>
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
                    {/* Background Image: Shopping bag / Lifestyle retail */}
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[15s] hover:scale-105"
                        style={{
                            backgroundImage: `url('https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop')` 
                        }}
                    ></div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-indigo-950/30"></div>

                    {/* Floating Badge 1: Freeship */}
                    <div className="absolute top-10 right-10 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3.5 transform hover:scale-105 transition duration-300">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white shadow-md">
                            <Truck className="w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                                Freeship Extra
                            </span>
                            <p className="text-sm font-extrabold text-slate-900 mt-0.5">Miễn phí ship toàn quốc</p>
                            <p className="text-[11px] text-slate-500">Đơn hàng đầu tiên trị giá từ 0đ</p>
                        </div>
                    </div>

                    {/* Floating Badge 2: Brand Trust */}
                    <div className="absolute bottom-44 left-10 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-3 transform hover:scale-105 transition duration-300">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white flex items-center justify-center font-bold shadow-md">
                            <ShieldCheck className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-extrabold text-slate-900">Cam kết chính hãng</p>
                            <p className="text-[11px] text-slate-500">Hoàn tiền 200% nếu phát hiện hàng giả</p>
                        </div>
                    </div>

                    {/* Bottom Narrative / Story */}
                    <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold backdrop-blur-sm mb-4">
                            <Percent className="w-3.5 h-3.5 text-emerald-400" />
                            QUYỀN LỢI THÀNH VIÊN MỚI
                        </div>
                        <h2 className="text-3xl font-extrabold mb-3 leading-snug">
                            Gia nhập cộng đồng người mua thông thái
                        </h2>
                        <p className="text-slate-300 text-base font-light leading-relaxed max-w-lg">
                            Đăng ký tài khoản để săn hàng loạt deal giảm sốc, tích điểm đổi voucher và nhận ưu đãi độc quyền dành riêng cho bạn.
                        </p>
                    </div>
                </div>
            </div>

            {/* --- MODAL ĐĂNG KÝ THÀNH CÔNG --- */}
            {dialog.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn">
                    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden transform transition-all scale-100 border border-slate-100">
                        {/* Header icon celebration */}
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 flex flex-col items-center justify-center text-white relative">
                            <div className="h-16 w-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-inner mb-3">
                                <Gift className="h-8 w-8 text-white" />
                            </div>
                            <h3 className="text-2xl font-black">Chúc mừng bạn!</h3>
                            <p className="text-emerald-100 text-xs mt-1">Đăng ký tài khoản MyShop thành công</p>
                        </div>
                        
                        {/* Body */}
                        <div className="p-6 text-center">
                            <p className="text-slate-600 text-sm mb-6 leading-relaxed">
                                {dialog.message}
                                <br />
                                <span className="text-xs text-slate-400 mt-2 block">
                                    Bạn có thể đăng nhập bằng email và mật khẩu vừa đăng ký.
                                </span>
                            </p>
                            
                            <Link
                                to="/login" state={{ email }}
                                className="w-full py-3.5 px-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-bold transition shadow-lg shadow-blue-500/25 flex items-center justify-center gap-2"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <span>Đăng nhập để mua sắm</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
