import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from '../assets/image/mylogo.png';
import useForgotPassword from '../hooks/auth/forgot_password/useForgotPassword';
import useApplyOtpForgotPassword from '@/hooks/auth/forgot_password/useApplyOtpForgotPassword';

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
        <div className="min-h-screen flex bg-slate-900 font-sans text-slate-100">
            {/* --- BÊN TRÁI: FORM --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-16 relative z-10">

                {/* Nút quay lại */}
                <div className="absolute top-8 left-8 lg:left-16">
                    <Link to="/forgot-password" className="flex items-center text-slate-400 hover:text-white transition gap-2 text-sm font-medium">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back
                    </Link>
                </div>

                <div className="max-w-md w-full mx-auto">
                    {/* Header */}
                    <div className="mb-8 text-center">
                        <div className="mx-auto h-16 w-16 bg-blue-600/20 rounded-full flex items-center justify-center mb-4 border border-blue-500/30">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">Password Reset</h1>
                        <p className="text-slate-400 text-sm">
                            Enter the OTP code sent to your email and set a new password.
                        </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-5">

                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-300">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                                placeholder="name@example.com"
                            />
                        </div>

                        {/* OTP Input  */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-300">OTP Code</label>
                            <input
                                type="text"
                                inputMode='numeric'
                                pattern="[0-9]*"
                                maxLength={6}
                                name="otp"
                                value={formData.otp}
                                onChange={handleChange}
                                required
                                placeholder="------"
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white text-center text-2xl tracking-[0.5em] font-mono placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                            <p
                                onClick={() => handleClickResendOtp()}
                                className="text-xs text-right text-blue-400 hover:text-blue-300 cursor-pointer transition">Resend OTP?</p>
                        </div>

                        {/* New Password */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-300">New Password</label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                required
                                placeholder="New password (min 6 chars)"
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-300">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                required
                                placeholder="Retype new password"
                                className={`w-full px-4 py-3 bg-slate-800 border rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition duration-200 ${formData.confirmPassword && formData.newPassword !== formData.confirmPassword
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-slate-700 focus:ring-blue-500 focus:border-transparent'
                                    }`}
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? "Verifying & Updating..." : "Reset Password"}
                        </button>
                    </form>
                </div>
            </div>

            {/* HÌNH ẢNH */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-800">
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1614064641938-3e821efd85bd?q=80&w=2070&auto=format&fit=crop')`
                    }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    <img src={logo} alt="Logo" className="h-10 w-auto mb-6 opacity-80" />
                    <h3 className="text-3xl font-bold mb-2">Security Verified</h3>
                    <p className="text-slate-200 text-lg font-light opacity-90">
                        "Strong authentication is the first step towards a secure digital future."
                    </p>
                </div>
            </div>

            {/* --- SUCCESS MODAL --- */}
            {successDialog && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in-up">
                        <div className="p-8 text-center">
                            <div className="mx-auto h-16 w-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>

                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Password Changed!</h3>
                            <p className="text-gray-500 dark:text-slate-400 mb-8">
                                Your password has been updated successfully. You can now login with your new credentials.
                            </p>

                            <button
                                onClick={() => navigate('/login')}
                                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition shadow-lg"
                            >
                                Back to Login
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}