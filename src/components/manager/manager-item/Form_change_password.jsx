// components/manager-item/Form_change_password.jsx
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUserInfor from "@/hooks/user/useUserInfor";
import userService from "../../../services/userService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons"; // Thêm icon đóng

export default function Form_change_password({ onClose }) {
    const queryClient = useQueryClient();
    const { data: user, isLoading } = useUserInfor();

    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [submit, setSubmiting] = useState(false);

    if (isLoading || !user.userProfile) return <div>Loading...</div>;

    // Handle input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        setError(""); // clear error 
    };

    // Handle submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        const { oldPassword, newPassword, confirmPassword } = formData;

        // Validate cơ bản
        if (!oldPassword || !newPassword || !confirmPassword) {
            setError("❌ Vui lòng nhập đầy đủ thông tin");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("❌ Mật khẩu xác nhận không khớp");
            return;
        }

        if (newPassword === oldPassword) {
            setError("❌ Mật khẩu mới không được trùng với mật khẩu cũ");
            return;
        }

        if (newPassword.length < 6) {
            setError("❌ Mật khẩu mới phải có ít nhất 6 ký tự");
            return;
        }

        setSubmiting(true);

        try {
            await userService.changePassword(user.id, {
                oldPassword: formData.oldPassword,
                newPassword: formData.newPassword,
                confirmPassword: formData.confirmPassword,
            });

            await queryClient.invalidateQueries(["userInfo"]);
            alert("✅ Cập nhật mật khẩu thành công!");
            onClose();
        } catch (err) {
            console.error("❌ Lỗi cập nhật:", err);
            setError(err?.response?.data?.message || "Đổi mật khẩu thất bại");
            alert("❌ Đổi mật khẩu thất bại");
        } finally {
            setSubmiting(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50">
            <div
                className="absolute inset-0 bg-black/50 transition-opacity duration-500"
                onClick={onClose}
            ></div>

            <div 
                className="fixed right-0 top-20 bottom-0 w-full max-w-md h-full bg-white shadow-xl z-50 p-6 animate-slide-in overflow-y-auto"
            >
                {/* Nút đóng */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
                    aria-label="Đóng"
                >
                    <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
                </button>
                
                <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-3">
                    Cập nhật mật khẩu
                </h3>
                
                {/* FORM */}
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Mật khẩu hiện tại</label>
                        <input
                            type="password"
                            name="oldPassword"
                            onChange={handleChange}
                            value={formData.oldPassword}
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                            placeholder="Nhập mật khẩu hiện tại"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Mật khẩu mới </label>
                        <input
                            type="password"
                            name="newPassword"
                            onChange={handleChange}
                            value={formData.newPassword}
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                            placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                        />
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-gray-700">Xác nhận mật khẩu mới </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            onChange={handleChange}
                            value={formData.confirmPassword}
                            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                            placeholder="Xác nhận mật khẩu mới"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm font-medium bg-red-50 p-3 rounded-lg mt-2">{error}</p>
                    )}


                    {/* Nút hành động */}
                    <div className="flex items-center justify-end gap-3 pt-6 border-t mt-auto">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-8 py-3 text-sm rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-300"
                            disabled={submit}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className={`px-8 py-3 text-sm rounded-lg font-semibold text-white transition duration-300 ${submit
                                    ? "bg-blue-400 cursor-not-allowed"
                                    : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"
                                }`}
                            disabled={submit}
                        >
                            {submit ? "Đang xử lý..." : "Cập nhật"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
