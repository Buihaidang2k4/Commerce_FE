import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUserInfor from "@/hooks/user/useUserInfor";
import profileService from "@/services/profileServce";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faCalendarAlt } from "@fortawesome/free-solid-svg-icons"; 

const HEADER_HEIGHT_TAILWIND = "top-20"; 

export default function Manager_form_information({ onClose }) {
  const queryClient = useQueryClient();
  const { data: userInfo, isLoading } = useUserInfor();
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const [formData, setFormData] = useState({
    username: "",
    gender: "true",
    birthDate: "",
    mobileNumber: "",
  });

  useEffect(() => {
    if (!userInfo?.userProfile) return;

    setFormData({
      username: userInfo.userProfile.username || "",
      gender: String(userInfo.userProfile.gender ?? true), 
      birthDate: userInfo.userProfile.birthDate || "",
      mobileNumber: userInfo.userProfile.mobileNumber || "",
    });
  }, [userInfo]);

  if (isLoading || !userInfo?.userProfile) return <div>Loading...</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;

    let newValue = value;

    if (name === "mobileNumber") {
      // Chỉ giữ lại số và format
      newValue = value.replace(/\D/g, "");
      if (newValue.length > 3 && newValue.length <= 6) {
        newValue = newValue.replace(/(\d{3})(\d+)/, "$1 $2");
      } else if (newValue.length > 6) {
        newValue = newValue.replace(/(\d{3})(\d{3})(\d+)/, "$1 $2 $3");
      }
      if (newValue.length > 13) return; 
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const mobileNumberToSend = formData.mobileNumber.replace(/\s/g, '');

    try {
      await profileService.createOrUpdateProfile(userInfo.id, {
        username: formData.username,
        gender: formData.gender === "true",
        birthDate: formData.birthDate,
        mobileNumber: mobileNumberToSend,
      });

      await queryClient.invalidateQueries(["userInfo"]);
      alert("Cập nhật thông tin cá nhân thành công!");
      onClose();
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Cập nhật thất bại");
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50">
      
      {/* Nền mờ */}
      <div className="absolute inset-0 bg-black/50 transition-opacity duration-500" onClick={onClose}></div>

      <div 
        className={`fixed right-0 ${HEADER_HEIGHT_TAILWIND} bottom-0 w-full max-w-md bg-white shadow-xl z-50 p-6 animate-slide-in overflow-y-auto`}
      >
        
        {/* Nút đóng */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition" 
            aria-label="Đóng"
        >
            <FontAwesomeIcon icon={faXmark} className="w-5 h-5" />
        </button>

        {/* Nội dung form */}
        <div className=""> 
            
            {/* Tiêu đề FORM */}
            <h3 className="text-2xl font-bold mb-8 text-gray-800 border-b pb-3">
                Cập nhật thông tin cá nhân
            </h3>
            
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>

                {/* Họ và tên */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Họ và tên</label>
                    <input
                        type="text"
                        name="username"
                        onChange={handleChange}
                        value={formData.username}
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                        placeholder="Nhập họ và tên"
                    />
                </div>

                {/* Giới tính */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Giới tính</label>
                    <select
                        name="gender"
                        onChange={handleChange}
                        value={formData.gender}
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition cursor-pointer"
                    >
                        <option value="true">Nữ</option>
                        <option value="false">Nam</option>
                    </select>
                </div>

                {/* Ngày sinh */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Ngày sinh</label>
                    <div className="relative">
                        <input
                            type="date"
                            name="birthDate"
                            onChange={handleChange}
                            value={formData.birthDate}
                            min="1900-01-01"
                            max="2100-12-31"
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                        />
                         <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                            <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5" />
                        </span>
                    </div>
                </div>

                {/* Số điện thoại */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Số điện thoại</label>
                    <input
                        type="tel"
                        name="mobileNumber"
                        onChange={handleChange}
                        value={formData.mobileNumber}
                        className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500 transition"
                        placeholder="VD: 090 123 4567"
                    />
                </div>

                {/* Email (Disabled) */}
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <input
                        type="email"
                        value={userInfo.email}
                        disabled
                        className="border border-gray-200 rounded-lg px-4 py-3 bg-gray-100 text-gray-500 cursor-not-allowed"
                        placeholder="user@gmail.com"
                    />
                </div>

                {/* Nút hành động */}
                <div className="flex items-center justify-end gap-3 pt-6 border-t mt-auto">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-8 py-3 text-sm rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition duration-300"
                        disabled={isSubmitting}
                    >
                        Hủy
                    </button>
                    <button
                        type="submit"
                        className={`px-8 py-3 text-sm rounded-lg font-semibold text-white transition duration-300 ${isSubmitting
                            ? "bg-blue-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-200"
                            }`}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Đang cập nhật..." : "Cập nhật"}
                    </button>
                </div>
            </form>
        </div>
      </div>
    </div>
  );
}