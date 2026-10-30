import apiBase from "./apiBase";

const AUTH = {
  LOGIN: '/auth/login',
  GOOGLE: '/auth/google',
  REGISTER: '/auth/register',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  INTROSPECT: '/auth/introspect',
};

const authService = {
  login: (data) => apiBase.post(AUTH.LOGIN, data),
  loginGoogle: (token) =>
    apiBase.post(
      AUTH.GOOGLE,
      { token },
      { headers: { 'Content-Type': 'application/json' } }
    ),
  register: (data) => apiBase.post(AUTH.REGISTER, data),
  forgotPassword: (data) => apiBase.post(AUTH.FORGOT_PASSWORD, data),
  resetPassword: (data) => apiBase.put(AUTH.RESET_PASSWORD, data),
  logout: () => apiBase.post(AUTH.LOGOUT),
  refresh_token: () => apiBase.post(AUTH.REFRESH),
  introspect: () => apiBase.post(AUTH.INTROSPECT),

  verifyToken: async () => {
    try {
      const res = await apiBase.post(AUTH.INTROSPECT);
      if (res.status === 200) {
        return res.data.data;
      }
      return { valid: false };
    } catch (error) {
      console.error("Error verify token:", error);
      return { valid: false };
    }
  },
};

export default authService;