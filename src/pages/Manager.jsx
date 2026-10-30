import { useState } from "react";
import profile from '@/assets/image/profile.png'
import useAuthStore from '@/stores/useAuthStore.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faUserShield,
    faTags,
    faClockRotateLeft,
    faAddressBook,
    faLink,
    faHome,
    faHistory,
    faRankingStar,
    faInfoCircle,
    faBookBookmark,
    faVoicemail,
    faBox
} from '@fortawesome/free-solid-svg-icons';

import { Outlet } from "react-router-dom";
import { FaAppStoreIos, FaGooglePlay } from "react-icons/fa";
import QR from '@/assets/image/qr.png';
import Manger_action_item from '../components/manager/manager-item/Manger_action_item';
import Manager_sidebar from '@/components/manager/manager-item/Manager_sidebar';

export default function Manager() {

    const [openSidebar, setOpenSidebar] = useState(false);

    const timeNow = new Date();
    const formatted = `${timeNow.getDay()}/${timeNow.getMonth() + 1}/${timeNow.getFullYear()}`;
    const { user } = useAuthStore();

    return (
        <div>
            <div className='container mx-auto p-5 flex flex-col gap-6'>


                {/* Header information */}
                <div className="relative bg-gradient-to-r from-[#f9fbff] via-[#eef5ff] to-[#f9fbff] w-full p-8 rounded-3xl shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-300 hover:shadow-2xl">

                    <div className="flex items-center gap-6 flex-1">
                        <div className="relative">
                            <img
                                src={profile}
                                alt="avatar"
                                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
                            />
                            <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></span>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="font-bold text-2xl text-gray-900">{user?.username || "Default User"}</span>
                            <span className="text-gray-500 text-sm">{user?.email || "default@email.com"}</span>
                            <span className="text-gray-500 text-sm">SĐT: 090xxxxxxx</span>
                            <span className="text-gray-400 text-xs">Cập nhật lần cuối: {formatted}</span>
                        </div>
                    </div>

                    <div className="hidden md:block h-20 w-px bg-gradient-to-b from-gray-200 to-gray-300"></div>

                    <div className="flex flex-col items-center justify-center flex-1 text-center gap-1">
                        <span className="text-3xl font-extrabold text-gray-900 tracking-tight">0</span>
                        <span className="text-sm text-gray-600 font-semibold">Tổng đơn hàng đã mua</span>
                    </div>

                    <div className="hidden md:block h-20 w-px bg-gradient-to-b from-gray-200 to-gray-300"></div>

                    <div className="flex flex-col items-center justify-center flex-1 text-center gap-1">
                        <span className="text-3xl font-extrabold text-gray-900 tracking-tight">0đ</span>
                        <span className="text-sm text-gray-600 font-semibold">Tổng tiền tích lũy</span>
                        <span className="text-xs text-red-600 font-medium mt-1">
                            Cần chi thêm <strong>10.000.000đ</strong> để lên hạng{" "}
                            <strong className="text-red-700">SVIP</strong>
                        </span>
                    </div>
                </div>


                {/* Action */}
                <div className="relative bg-gradient-to-r from-[#f9fbff] via-[#eef5ff] to-[#f9fbff] w-full p-5 rounded-3xl shadow-lg border border-gray-100 flex flex-wrap md:flex-row items-center justify-center gap-x-20 transition-all duration-300 hover:shadow-2xl">
                    <Manger_action_item to={"manage-membership-levels-and-benefits"} icon={<FontAwesomeIcon icon={faUserShield} className="text-xl" />} label="Hạng thành viên" />
                    <Manger_action_item to={"manage-membership-levels-and-benefits"} icon={<FontAwesomeIcon icon={faTags} className="text-xl" />} label="Mã giảm giá" />
                    <Manger_action_item to={"manage-purchase-history"} icon={<FontAwesomeIcon icon={faClockRotateLeft} className="text-xl" />} label={"Thông tin đơn hàng"} />
                    <Manger_action_item to={"manager-userinfo"} icon={<FontAwesomeIcon icon={faAddressBook} className="text-xl" />} label={"Địa chỉ"} />
                    <Manger_action_item icon={<FontAwesomeIcon icon={faLink} className="text-xl" />} label={"Liên kết tài khoản"} />
                </div>



                {/* MAIN LAYOUT: SIDEBAR + CONTENT  */}
                <div className="relative w-full p-3 rounded-3xl bg-white flex flex-col md:flex-row gap-4 transition-all duration-300">

                    {/* Nút mở sidebar (mobile) */}
                    <button
                        className="md:hidden px-4 py-2 bg-gray-200 rounded-xl shadow mb-3 w-fit"
                        onClick={() => setOpenSidebar(true)}
                    >
                        ☰ Manager action
                    </button>


                    {/* Overlay khi mở sidebar mobile */}
                    {openSidebar && (
                        <div
                            className="fixed inset-0 bg-black/40 z-40 md:hidden"
                            onClick={() => setOpenSidebar(false)}
                        ></div>
                    )}

                    {/* SIDEBAR */}
                    <aside
                        className={`
                            fixed md:static
                            top-0 left-0
                            h-full md:h-auto
                            w-64 p-4 rounded-2xl shadow-md
                            bg-gradient-to-r from-[#f9fbff] via-[#eef5ff] to-[#f9fbff]
                            flex flex-col gap-4
                            transform transition-transform duration-300 z-50
                            ${openSidebar ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
                        `}
                    >

                        {/* nút đóng sidebar mobile */}
                        <button
                            className="md:hidden mb-2 text-gray-700 text-left"
                            onClick={() => setOpenSidebar(false)}
                        >
                            ✖ Đóng
                        </button>

                        <Manager_sidebar to={"manager-overview"} icon={<FontAwesomeIcon icon={faHome} className="text-[20px] text-red-600" />} label={"Tổng quan"} />
                        <Manager_sidebar to={"manage-purchase-history"} icon={<FontAwesomeIcon icon={faHistory} className="text-[20px] text-blue-600" />} label={"Thông tin đơn hàng"} />
                        <Manager_sidebar to={"manage-membership-levels-and-benefits"} icon={<FontAwesomeIcon icon={faRankingStar} className="text-[20px] text-yellow-600" />} label={"Hạng thành viên và ưu đãi"} />

                        <div className="hidden md:block h-[1px] w-full bg-gray-300 my-2"></div>

                        <Manager_sidebar to={"manager-userinfo"} icon={<FontAwesomeIcon icon={faInfoCircle} className="text-[20px] text-blue-600" />} label={"Thông tin tài khoản"} />
                        <Manager_sidebar icon={<FontAwesomeIcon icon={faBookBookmark} className="text-[20px] text-indigo-600" />} label={"Chính sách bảo hành"} />
                        <Manager_sidebar icon={<FontAwesomeIcon icon={faVoicemail} className="text-[20px] text-indigo-600" />} label={"Điều khoản sử dụng"} />
                        <Manager_sidebar icon={<FontAwesomeIcon icon={faBox} className="text-[20px] text-indigo-600" />} label={"Góp ý - Phản hồi - Hỗ trợ"} />

                        <div className="hidden md:block h-[1px] w-full bg-gray-300 my-2"></div>

                        {/* QR Chỉ hiển thị mobile */}
                        <div className="mt-6 text-center space-y-2">
                            <p className="text-base font-medium text-gray-700">Tải ứng dụng để trải nghiệm tốt hơn</p>

                            <div className="flex justify-center">
                                <img src={QR} alt="QR tải ứng dụng" className="w-28 h-28 rounded-lg shadow-md" />
                            </div>

                            <p className="text-sm text-gray-500">Quét mã QR để tải ngay</p>

                            <div className="flex justify-center gap-3 mt-2">
                                <a href="#" className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow hover:bg-blue-50 transition hover:scale-105">
                                    <FaAppStoreIos className="text-blue-600 text-xl" />
                                    <span className="text-sm font-medium text-gray-700">App Store</span>
                                </a>
                                <a href="#" className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow hover:bg-green-50 transition hover:scale-105">
                                    <FaGooglePlay className="text-green-600 text-xl" />
                                    <span className="text-sm font-medium text-gray-700">Google Play</span>
                                </a>
                            </div>
                        </div>
                    </aside>


                    {/* RIGHT CONTENT */}
                    <main className="flex-1 p-6 bg-gradient-to-r from-[#f9fbff] via-[#eef5ff] to-[#f9fbff] rounded-2xl shadow-sm">
                        <Outlet />
                    </main>

                </div>
            </div>
        </div>
    );
}
