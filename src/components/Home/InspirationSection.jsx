import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowRight
} from "@fortawesome/free-solid-svg-icons";
export const InspirationSection = () => (
    <div className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                <div>
                    <span className="text-blue-600 font-bold tracking-wider uppercase text-xs mb-2 block">Lifestyle</span>
                    <h2 className="text-3xl font-extrabold text-gray-900">Không gian & Cảm hứng</h2>
                    <p className="text-gray-500 mt-2 text-sm max-w-xl">
                        Khám phá các góc setup cực chất từ cộng đồng. Tìm kiếm phong cách phù hợp với cá tính của bạn.
                    </p>
                </div>
                <button className="group flex items-center gap-2 px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-full font-semibold transition-all">
                    Xem tất cả bộ sưu tập
                    <FontAwesomeIcon icon={faArrowRight} className="group-hover:translate-x-1 transition-transform text-sm" />
                </button>
            </div>

            {/* Grid Layout - Masonry Style giả lập */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 h-auto md:h-[500px]">

                {/* Card Lớn - GAMING */}
                <div className="lg:col-span-2 row-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=800&q=80"
                        alt="Gaming Setup"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded w-fit mb-2">HOT TREND</span>
                        <h3 className="text-2xl font-bold text-white mb-1">Góc Gaming RGB Đỉnh Cao</h3>
                        <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                            Trọn bộ PC, Màn hình, Bàn phím cơ và đèn LED trang trí.
                        </p>
                    </div>
                </div>

                {/* Card Nhỏ 1 - WORKSPACE */}
                <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600&q=80"
                        alt="Office Setup"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col justify-end p-4">
                        <h3 className="text-lg font-bold text-white">Minimalist Workspace</h3>
                        <span className="text-xs text-gray-200">Cho người yêu sự tối giản</span>
                    </div>
                </div>

                {/* Card Nhỏ 2 - AUDIO */}
                <div className="relative group overflow-hidden rounded-2xl cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=600&q=80"
                        alt="Audio Setup"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex flex-col justify-end p-4">
                        <h3 className="text-lg font-bold text-white">Audiophile Corner</h3>
                        <span className="text-xs text-gray-200">Loa, Tai nghe &amp; Amply</span>
                    </div>
                </div>

                {/* Card Ngang - TRAVEL (Chiếm 2 cột nhỏ) */}
                <div className="lg:col-span-2 relative group overflow-hidden rounded-2xl cursor-pointer">
                    <img
                        src="https://images.unsplash.com/photo-1515965885361-f1e0095517ea?w=800&q=80"
                        alt="Tech Travel"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center p-6">
                        <h3 className="text-xl font-bold text-white mb-2">Công nghệ cho những chuyến đi</h3>
                        <p className="text-gray-300 text-sm max-w-xs mb-4">
                            Camera hành trình, Pin dự phòng và những phụ kiện không thể thiếu.
                        </p>
                        <span className="text-white text-xs font-bold underline decoration-2 underline-offset-4 hover:text-blue-400 transition">Khám phá ngay</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
);