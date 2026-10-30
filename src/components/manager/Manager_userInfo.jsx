import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import Manager_form_information from "./manager-item/Form_Information";
import useUserInfor from "@/hooks/user/useUserInfor";
import Form_address from "./manager-item/Form_address";
import Form_change_password from "./manager-item/form_change_password";
export default function UserInfo() {
  const [showFormUserInfomation, setShowFormUserInfomation] = useState(false);
  const [showFormPassword, setShowFormPassword] = useState(false);

  const { data: user, isLoading } = useUserInfor();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Thông tin cá nhân */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        {/* Tiêu đề và nút cập nhật */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Thông tin tài khoản</h2>
          <button
            onClick={() => setShowFormUserInfomation(true)}
            className="flex items-center gap-1 text-red-500 text-sm font-medium hover:underline hover:text-red-600 transition cursor-pointer">
            <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
            <span>Cập nhật</span>
          </button>
        </div>

        {/*  info user */}
        <div className="grid xl:grid-cols-2 gap-x-8 gap-y-4 text-sm text-gray-700 sm:grid-cols-1">
          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Họ và tên:</span>
            <span className="font-semibold">{user.userProfile.username || "Default User"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Số điện thoại:</span>
            <span className="font-semibold">{user.userProfile.mobileNumber != undefined ? user.userProfile.mobileNumber : "-"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Giới tính:</span>
            <span className="font-semibold">{user.userProfile.gender != undefined ? (user.userProfile.gender === false ? "Nam" : "Nữ") : "-"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Email:</span>
            <span className="font-semibold">{user.email || "-"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Ngày sinh:</span>
            <span className="font-semibold">{user.userProfile.birthDate != undefined ? user.userProfile.birthDate : "-"}</span>
          </div>

          <div className="flex justify-between border-b border-gray-200 pb-2">
            <span className="font-medium text-gray-500">Địa chỉ mặc định:</span>
            <span className="font-semibold">-</span>
          </div>
        </div>

        {showFormUserInfomation && <Manager_form_information onClose={() => setShowFormUserInfomation(false)} />}
      </section>


      {/* Mật khẩu tài khoản liên kết */}
      <section>
        <div className="flex flex-col gap-4 md:flex-row sm:flex-wrap">

          {/* Cột 1: Mật khẩu */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-2 bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Mật khẩu</h2>
              <button
                onClick={() => setShowFormPassword(true)}
                className="flex items-center gap-1 text-red-500 text-sm font-medium hover:underline hover:text-red-600 transition cursor-pointer">
                <FontAwesomeIcon icon={faPenToSquare} className="text-xs" />
                <span>Thay đổi mật khẩu</span>
              </button>
            </div>
            <p className="text-gray-500">Cập nhật lần cuối: 10/11/2025 08:59</p>
          </div>

          {/* Cột 2: Tài khoản liên kết */}
          <div className="flex-1 min-w-[300px] flex flex-col gap-2 bg-white rounded-2xl shadow-md p-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-2">
              <h2 className="text-lg font-semibold text-gray-800">Tài khoản liên kết</h2>
              <button className="text-red-500 text-sm hover:underline">Quản lý liên kết</button>
            </div>
            <ul className="space-y-1">
              <li className="flex justify-between">
                <span>Google</span>
                <span className="text-green-600">Đã liên kết</span>
              </li>
              <li className="flex justify-between">
                <span>Zalo</span>
                <span className="text-gray-500">Chưa liên kết</span>
              </li>
            </ul>
            {showFormPassword && <Form_change_password onClose={() => setShowFormPassword(false)} />}
          </div>
        </div>
      </section>
    </div >
  )
}
