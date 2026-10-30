import { create } from "zustand";
import { persist } from "zustand/middleware";
import authService from "@/services/authService";
import { notify } from "../utils/notify";
import { parseExpToMs } from "../utils/jwt";
import { fetchCurrentUser } from "../services/userService";

let refreshTimeout = null;

const getRoleValue = (role) => {
    if (!role) return null;
    if (typeof role === "string") return role.replace("ROLE_", "");
    return (role.name || role.code || role.authority || "").replace("ROLE_", "") || null;
};

const getUserRole = (user) => {
    if (!user) return null;
    if (Array.isArray(user.roles) && user.roles.length > 0) {
        return getRoleValue(user.roles[0]);
    }
    return getRoleValue(user.role);
};

const clearAuthState = () => ({
    user: null,
    role: null,
    loading: false,
    isLoggedIn: false,
    exp: null,
});

const useAuthStore = create(
    persist(
        (set, get) => ({
            user: null,
            role: null,
            loading: false,
            isLoggedIn: false,
            exp: null,

            //  ======= LOGIN ==========
            login: async (email, password) => {
                set({ loading: true });
                try {
                    await authService.login({ email, password });

                    const user = await fetchCurrentUser();
                    const role = getUserRole(user);
                    const { exp } = await authService.verifyToken();
                    const expMs = parseExpToMs(exp);


                    set({
                        user,
                        role,
                        loading: false,
                        isLoggedIn: true,
                        exp: expMs,
                    });

                    if (expMs) {
                        get().startTokenWatcher();
                    }
                    notify.success("Đăng nhập thành công")

                    return { success: true, role };
                } catch (error) {
                    set(clearAuthState());

                    console.error("❌ Đăng nhập thất bại: ", error);
                    notify.error("Đăng nhập thất bại vui lòng thử lại !");

                    return { success: false };
                }
            },

            // =========== LOGOUT ================
            logout: async () => {
                clearTimeout(refreshTimeout);
                try {
                    await authService.logout();
                } catch (error) {
                    console.error("Logout API error:", error);
                } finally {
                    set(clearAuthState());
                }
                console.log("Đăng xuất thành công");
            },

            // ============== TOKEN WATCHER ===============
            startTokenWatcher: async () => {
                clearTimeout(refreshTimeout);

                try {
                    const { valid, exp } = await authService.verifyToken();
                    if (!valid) return;

                    const expTime = parseExpToMs(exp);
                    if (!expTime) {
                        console.error("Invalid token exp format:", exp);
                        return;
                    }

                    const timeLeft = expTime - Date.now();



                    if (timeLeft <= 0) {
                        await authService.refresh_token();
                        return get().startTokenWatcher();
                    }

                    const refreshBefore = 60_000;
                    const refreshIn = Math.max(timeLeft - refreshBefore, 0);

                    console.log(
                        `🕒 Token còn ${(timeLeft / 60000).toFixed(1)} phút. 
                        Sẽ refresh sau ${(refreshIn / 1000).toFixed(1)} giây.`
                    );

                    refreshTimeout = setTimeout(async () => {
                        try {
                            await authService.refresh_token();
                            get().startTokenWatcher();
                        } catch {
                            set(clearAuthState());
                        }
                    }, refreshIn);

                } catch (error) {
                    console.error("Lỗi khi theo dõi token:", error);
                }
            }
        }),
        {
            name: "auth-storage",
        }
    )
);

export default useAuthStore;
