import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faFire, faBolt,
    faChevronRight,
    faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import useProducts from "../hooks/product/useProducts";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import Category from "../components/Home/Category";
import ProductList from "../components/product-list/ProductList";
import { formatCurrency } from "../components/product-details/sample/FomartProduct";
import { HeroSection } from "../components/Home/HeroSection";
import { ServiceBar } from "../components/Home/ServiceBar";
import { InspirationSection } from "../components/Home/InspirationSection";
import { AppSection } from "../components/Home/AppSection";
import { AboutShopSection } from "../components/Home/AboutShopSection";

export default function HomePrivate() {
    const [page, setPage] = useState(0);
    const [paramsSearch, setParamSearch] = useState({
        keyword: null,
        categoryName: null,
        minPrice: null,
        maxPrice: null,
        hasDiscount: null,
        bestSeller: null,
        rating: null,
        origin: null,
        page: 0,
        size: 20,
        sort: [],
    })

    const { data, isLoading, isError, isFetching } = useProducts(page, 15);
    const products = data?.data?.data?.content || [];
    const totalPages = data?.data?.data?.totalPages || 1;


    if (isLoading) return <Loading />;
    if (isError) return <Error />;

    return (
        <div className="bg-gray-50 min-h-screen">
            <HeroSection />
            <ServiceBar />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 space-y-16">

                {/* 1. Category */}
                <section>
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800">Danh Mục Sản Phẩm</h3>
                        <div className="w-16 h-1 bg-blue-600 mx-auto mt-2 rounded-full"></div>
                    </div>
                    <Category />
                </section>

                {/* 2. Flash Sale Section */}
                <section className="bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden mt-10">
                    {/* Header Flash Sale */}
                    <div className="px-5 py-4 flex flex-col md:flex-row justify-between items-center gap-4 bg-white border-b border-gray-100">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <h2 className="text-2xl font-extrabold text-red-600 italic tracking-tighter uppercase">
                                    <FontAwesomeIcon icon={faBolt} className="mr-2 animate-bounce" />
                                    Flash Sale
                                </h2>
                            </div>
                        </div>

                        <a href="#" className="text-sm font-semibold text-gray-500 hover:text-red-600 flex items-center gap-1 transition-colors">
                            Xem tất cả <FontAwesomeIcon icon={faChevronRight} className="text-xs" />
                        </a>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div className="p-5 grid grid-cols-2 md:grid-cols-4 gap-4">
                        {products.slice(0, 4).map((prod, index) => {
                            // --- CẤU HÌNH DATA GIẢ LẬP ĐỂ DEMO (Nếu API chưa có) ---
                            // Danh sách ảnh mẫu đẹp (Công nghệ, Đồng hồ, Giày...)
                            const demoImages = [
                                "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80", // Tai nghe
                                "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80", // Đồng hồ
                                "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80", // Camera
                                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", // Giày
                            ];

                            // Lấy ảnh từ API, nếu không có thì lấy ảnh demo theo index
                            const displayImage = prod.image || demoImages[index % demoImages.length];
                            const fakeSold = 15 + (index * 12); // Giả lập số lượng bán
                            const percentSold = Math.min(90, 20 + (index * 20)); // Giả lập % thanh progress
                            // --------------------------------------------------------

                            return (
                                <div
                                    key={prod.productId}
                                    className="group relative flex flex-col bg-white border border-transparent hover:border-red-500 hover:shadow-lg rounded-lg p-3 transition-all duration-300 cursor-pointer"
                                >
                                    {/* Badge Giảm giá */}
                                    <div className="absolute top-0 right-0 z-10">
                                        <div className="bg-yellow-400 text-red-700 text-xs font-extrabold px-2 py-1 rounded-bl-lg rounded-tr-md shadow-sm">
                                            -45%
                                        </div>
                                    </div>

                                    {/* Ảnh sản phẩm (Vuông) */}
                                    <div className="relative w-full aspect-square mb-3 overflow-hidden rounded-md bg-gray-50">
                                        <img
                                            src={displayImage}
                                            alt={prod.productName}
                                            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    {/* Thông tin */}
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-red-600 transition-colors">
                                                {prod.productName || "Sản phẩm mẫu demo tên dài để test giao diện"}
                                            </h3>
                                            <div className="flex items-baseline gap-2">
                                                <span className="text-lg font-bold text-red-600">
                                                    {formatCurrency ? formatCurrency(prod.price) : prod.price.toLocaleString() + "đ"}
                                                </span>
                                                <span className="text-xs text-gray-400 line-through">
                                                    {formatCurrency ? formatCurrency(prod.price * 1.45) : (prod.price * 1.45).toLocaleString() + "đ"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Thanh Progress "Đã bán" (Style Shopee) */}
                                        <div className="mt-3 relative w-full h-4 bg-red-100 rounded-full overflow-hidden">
                                            {/* Thanh màu đỏ bên trong */}
                                            <div
                                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-500 to-red-600 rounded-full"
                                                style={{ width: `${percentSold}%` }}
                                            ></div>

                                            {/* Icon lửa trang trí */}
                                            {percentSold > 50 && (
                                                <div className="absolute top-0 left-1 h-full flex items-center text-[10px] text-white animate-pulse">
                                                    <FontAwesomeIcon icon={faFire} />
                                                </div>
                                            )}

                                            {/* Text nằm đè lên trên */}
                                            <div className="absolute inset-0 flex items-center justify-center z-10">
                                                <span className="text-[10px] font-bold text-white uppercase tracking-wide drop-shadow-sm">
                                                    Đã bán {fakeSold}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* 3. Banner Quảng cáo giữa trang */}
                <section className="relative rounded-2xl overflow-hidden h-64 flex items-center bg-gradient-to-r from-blue-800 to-indigo-900 shadow-xl">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="relative z-10 px-8 md:px-16 w-full md:w-2/3">
                        <span className="text-blue-300 font-bold tracking-widest text-sm mb-2 block">SUMMER COLLECTION</span>
                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-6">Nâng cấp phong cách <br /> Phụ kiện thời thượng</h3>
                        <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 hover:shadow-lg transition">
                            Mua Ngay
                        </button>
                    </div>
                    {/* Hình trang trí */}
                    <div className="absolute right-[-50px] bottom-[-50px] w-64 h-64 bg-blue-500 rounded-full mix-blend-overlay blur-3xl"></div>
                </section>

                {/* 4. MAIN PRODUCT LIST */}
                <section>
                    <div className="flex items-center gap-3 mb-6 border-l-4 border-orange-500 pl-4">
                        <h2 className="text-2xl font-bold text-gray-900">Gợi ý hôm nay</h2>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 min-h-[400px] relative">
                        {isFetching && <div className="absolute inset-0 bg-white/50 z-20 flex justify-center items-center"><Loading /></div>}
                        <ProductList
                            products={products}
                            totalPages={totalPages}
                            page={page}
                            setPage={page}
                            isLoading={false}
                        />
                    </div>
                </section>
            </div>

            <InspirationSection />
            <AppSection />
            <AboutShopSection />
            <div className="bg-blue-600 py-10">
                <div className="max-w-3xl mx-auto px-4 text-center text-white">
                    <FontAwesomeIcon icon={faEnvelope} className="text-4xl mb-4 opacity-80" />
                    <h2 className="text-2xl font-bold mb-2">Đăng ký nhận bản tin</h2>
                    <p className="text-blue-100 mb-6">Nhận mã giảm giá 50% cho đơn hàng đầu tiên khi đăng ký ngay hôm nay.</p>
                    <div className="flex flex-col sm:flex-row gap-2 justify-center">
                        <input
                            type="email"
                            placeholder="Địa chỉ email của bạn..."
                            className="px-5 py-3 rounded-lg w-full sm:w-96 text-white focus:outline-none focus:ring-2 focus:ring-yellow-400"
                        />
                        <button className="bg-gray-900 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800 transition">
                            Đăng ký
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}