import React, { useState } from 'react';
import logo from '../assets/image/mylogo.png';
import GoogleLoginButton from '../components/Login/GoogleLoginButton';
import useLogin from '../hooks/auth/login/useLogin';
import { Link } from 'react-router-dom';
import useLoginForm from '../hooks/auth/login/useLoginForm';
import useAuthRedirect from '../hooks/auth/login/useAuthRedirect';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
export default function Login() {
    const { error, loading, submitLogin } = useLogin();
    const { email, password, setEmail, setPassword } = useLoginForm();
    const { redirectByRole } = useAuthRedirect();
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPass = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const result = await submitLogin(email, password);
        if (result.success) {
            redirectByRole(result.role);
        }
    }


    return (
        <div className="min-h-screen flex bg-slate-900 font-sans text-slate-100">
            {/* --- BÊN TRÁI: FORM --- */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-16 relative z-10">

                {/* Trang trí nền mờ nhẹ cho mobile */}
                <div className="absolute inset-0 bg-slate-900 lg:bg-transparent -z-10"></div>

                <div className="max-w-md w-full mx-auto">
                    {/* Header */}
                    <div className="mb-10 text-center lg:text-left">
                        {/* Bạn có thể dùng thẻ img cho logo thay vì text để đẹp hơn */}
                        {/* <img src={logo} alt="Logo" className="h-10 mb-6 mx-auto lg:mx-0" /> */}
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">
                            MYSHOPAPI
                        </h1>
                        <h2 className="text-xl text-slate-400 font-medium">
                            Welcome back! Please enter your details.
                        </h2>
                    </div>

                    {/* Form */}
                    <form className="space-y-6" onSubmit={handleLogin} autoComplete="on">
                        {/* Email Input */}
                        <div className="space-y-1">
                            <label className="block text-sm font-medium text-slate-300">Email address</label>
                            <input
                                type="email"
                                value={email}
                                name='email'
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                autoComplete="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                        </div>

                        {/* Password Input */}
                        <div className="space-y-1 relative">
                            <label className="block text-sm font-medium text-slate-300">Password</label>
                            <input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                name='password'
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                            />
                            <FontAwesomeIcon
                                onClick={handleClickShowPass}
                               className="absolute right-5 top-10 cursor-pointer hover:scale-110 hover:text-blue-400 hover:rotate-12 transition duration-300 ease-in-out"
                                icon={faEye} />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        )}

                        {/* Remember & Forgot Pass */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center text-sm text-slate-400 cursor-pointer hover:text-slate-300 transition">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 rounded border-slate-600 bg-slate-800 text-blue-600 focus:ring-blue-500/50 mr-2"
                                />
                                Remember me
                            </label>
                            <Link to="/forgot-password" className="text-sm font-medium text-blue-500 hover:text-blue-400 hover:underline transition">
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Signing in...
                                </span>
                            ) : "Sign in"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-700"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-4 bg-slate-900 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="flex justify-center">
                        <div className="w-full">
                            <div className="transform transition hover:scale-[1.02]">
                                <GoogleLoginButton />
                            </div>
                        </div>
                    </div>

                    {/* Footer Register */}
                    <p className="mt-8 text-center text-sm text-slate-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="font-semibold text-blue-500 hover:text-blue-400 transition ml-1">
                            Register here
                        </Link>
                    </p>
                </div>
            </div>

            {/* --- BÊN PHẢI: IMAGE/BANNER --- */}
            <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-800">
              
                <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[20s] hover:scale-110"
                    style={{
                        backgroundImage: `url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')`
                    }}
                ></div>

                {/* Lớp phủ màu gradient để text dễ đọc và đẹp hơn */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                {/* Nội dung đè lên ảnh bên phải */}
                <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                    {/* Hiển thị logo nhỏ ở đây nếu muốn */}
                    <img src={logo} alt="Logo" className="h-12 w-auto mb-6 opacity-90" />

                    <blockquote className="space-y-2">
                        <p className="text-lg font-light italic opacity-90">
                            "Automation is the future, and myshopapi is the bridge to that future."
                        </p>
                        <footer className="text-sm font-bold text-blue-400">
                            &mdash; The Myshopapi Team
                        </footer>
                    </blockquote>
                </div>
            </div>
        </div>
    );
}