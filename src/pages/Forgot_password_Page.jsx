import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/image/mylogo.png'; // Đảm bảo đường dẫn đúng
import useForgotPassword from '../hooks/auth/forgot_password/useForgotPassword';

export default function ForgotPasswordPage() {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false); // Trạng thái đã gửi thành công
    const [error, setError] = useState('');
    const { mutate: forgotPassword } = useForgotPassword();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSubmitted(true);
        } catch (err) {
            setError('Email không tồn tại hoặc có lỗi xảy ra.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleClickOpenEmail = () => {
        forgotPassword({ email });

        setTimeout(
            navigate("/forgot-password-otp",
                {
                    state: { email },
                }
            ), 3000
        )
    }

    return (
        <div className="min-h-screen flex bg-slate-900 font-sans text-slate-100">
            {/* --- BÊN TRÁI: FORM --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-16 relative z-10">
                {/* Back Button */}
                <div className="absolute top-8 left-8 lg:left-16">
                    <Link to="/login" className="flex items-center text-slate-400 hover:text-white transition gap-2 text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Login
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto">
                    {/* ICON KHÓA */}
                    <div className="mb-6 flex justify-center lg:justify-start">
                        <div className="h-12 w-12 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/30 text-blue-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-12 0v1H7a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V9a6 6 0 00-6-5z" />
                            </svg>
                        </div>
                    </div>

                    {/* NỘI DUNG CHÍNH */}
                    {!isSubmitted ? (
                        /* --- TRẠNG THÁI 1: FORM NHẬP EMAIL --- */
                        <>
                            <div className="mb-8 text-center lg:text-left">
                                <h1 className="text-3xl font-bold text-white mb-2">Forgot password?</h1>
                                <p className="text-slate-400">
                                    No worries, we'll send you reset instructions.
                                </p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-1">
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                        Email address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    />
                                </div>

                                {error && (
                                    <div className="text-red-400 text-sm bg-red-500/10 p-2 rounded border border-red-500/20">
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                                >
                                    {loading ? "Sending instruction..." : "Reset password"}
                                </button>
                            </form>
                        </>
                    ) : (
                        /* --- TRẠNG THÁI 2: THÔNG BÁO THÀNH CÔNG --- */
                        <div className="text-center lg:text-left animate-fade-in-up">
                            <h1 className="text-3xl font-bold text-white mb-2">Check your email</h1>
                            <p className="text-slate-400 mb-6">
                                We sent a password reset link to <span className="text-white font-medium">{email}</span>
                            </p>

                            <div className="space-y-4">
                                <a
                                    onClick={() => handleClickOpenEmail()}
                                    href="https://gmail.com"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="block w-full text-center py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
                                >
                                    Open email app
                                </a>

                                <p className="text-sm text-slate-500 text-center">
                                    Didn't receive the email?{" "}
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="text-blue-500 hover:underline font-medium"
                                    >
                                        Click to resend
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* --- BÊN PHẢI: HÌNH ẢNH --- */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-800">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1555421689-4917475181f3?q=80&w=2070&auto=format&fit=crop')`
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    {/* Logo nhỏ */}
                    <img src={logo} alt="Logo" className="h-10 w-auto mb-6 opacity-80" />
                    <h3 className="text-3xl font-bold mb-2">Secure your account</h3>
                    <p className="text-slate-200 text-lg font-light opacity-90">
                        "Security is not a product, but a process."
                    </p>
                </div>
            </div>
        </div>
    );
}