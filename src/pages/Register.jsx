import React from 'react';
import logo from "@/assets/image/mylogo.png";
import useRegister from "@/hooks/auth/useRegister";
import { Link } from "react-router-dom";

export default function Register() {
    const {
        email, setEmail,
        username, setUsername,
        password, setPassword,
        confirmPassword, setConfirmPassword,
        error, handleRegister,
        loading, dialog,
    } = useRegister();

    return (
        <>
            <div className="min-h-screen flex bg-slate-900 font-sans text-slate-100">
                {/* --- BÊN TRÁI: FORM ĐĂNG KÝ --- */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 lg:px-16 relative z-10">
                    
                    {/* Background decoration cho mobile */}
                    <div className="absolute inset-0 bg-slate-900 lg:bg-transparent -z-10"></div>

                    <div className="max-w-md w-full mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 mb-2">
                                MYSHOPAPI
                            </h1>
                            <h2 className="text-xl text-slate-300 font-semibold">
                                Create an account
                            </h2>
                            <p className="text-slate-500 text-sm mt-1">
                                Join us today and start your journey.
                            </p>
                        </div>

                        {/* Form */}
                        <form className="space-y-5" onSubmit={handleRegister} autoComplete="on">
                            {/* Username Input */}
                            <div className="space-y-1">
                                <label htmlFor="username" className="block text-sm font-medium text-slate-300">
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoComplete="username"
                                    placeholder="johndoe"
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                />
                            </div>

                            {/* Email Input */}
                            <div className="space-y-1">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                    placeholder="name@company.com"
                                    className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                />
                            </div>

                            {/* Password Group */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    />
                                </div>

                                <div className="space-y-1">
                                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                                        Confirm Password
                                    </label>
                                    <input
                                        id="confirmPassword"
                                        type="password"
                                        name="confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        required
                                        autoComplete="new-password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                                    />
                                </div>
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <div className="p-3 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-start gap-2 animate-pulse">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mt-0.5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    <span>{error}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-lg shadow-lg shadow-blue-500/30 transition-all duration-300 transform hover:-translate-y-0.5 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating account...
                                    </span>
                                ) : "Sign up"}
                            </button>

                            {/* Footer Link */}
                            <p className="mt-4 text-center text-sm text-slate-400">
                                Already have an account?{" "}
                                <Link to="/login" className="font-semibold text-blue-500 hover:text-blue-400 transition ml-1">
                                    Log in
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>

                {/* --- BÊN PHẢI: HÌNH ẢNH/BANNER --- */}
                <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-slate-800">
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-[20s] hover:scale-105"
                        style={{
                            // Dùng ảnh công nghệ abstract hoặc ảnh logo của bạn nếu đủ lớn
                            backgroundImage: `url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')` 
                            // Hoặc dùng: backgroundImage: `url(${logo})`
                        }}
                    ></div>
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-slate-900/20"></div>

                    {/* Nội dung trang trí bên phải */}
                    <div className="absolute bottom-0 left-0 right-0 p-12 text-white">
                        <img src={logo} alt="Logo" className="h-12 w-auto mb-6 opacity-90 drop-shadow-lg" />
                        <h3 className="text-3xl font-bold mb-2">Join the Community</h3>
                        <p className="text-slate-200 text-lg font-light opacity-90">
                            "Unlock the potential of your data with our powerful API solutions."
                        </p>
                    </div>
                </div>
            </div>

            {/* --- SUCCESS MODAL --- */}
            {dialog.show && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
                    <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden transform transition-all scale-100">
                        {/* Header màu xanh */}
                        <div className="bg-green-500 p-4 flex justify-center">
                            <div className="h-16 w-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        
                        {/* Body */}
                        <div className="p-6 text-center">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">Success!</h3>
                            <p className="text-gray-600 dark:text-slate-300 mb-6">
                                {dialog.message}
                            </p>
                            
                            <Link
                                to="/login"
                                className="block w-full py-3 bg-gray-900 dark:bg-blue-600 text-white rounded-lg font-semibold hover:bg-gray-800 dark:hover:bg-blue-700 transition shadow-lg"
                            >
                                Continue to Login
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}