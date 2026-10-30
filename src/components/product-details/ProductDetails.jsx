import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faShoppingCart, faStar, faCheckCircle, faShieldAlt,
    faTruckFast, faExchangeAlt, faMinus, faPlus
} from '@fortawesome/free-solid-svg-icons';

// Hooks & Utils
import useFindImageByProductId from "../../hooks/image/useFindImageByProductId";
import useProducts from "../../hooks/product/useProducts";
import useFindReviewByProductId from "@/hooks/review/useFindReviewByProductId";
import useAddItemToCart from "../../hooks/cart-item/useAddItemToCart";
import useUserInfor from "@/hooks/user/useUserInfor";
import { notify } from "../../utils/notify";
import Loading from "../../utils/Loading";
import logo from "../../assets/image/mylogo.png";
import { formatCurrency, convertSoldCount, convertAvgRating } from "./sample/FomartProduct";

// Components
import ProductList from "../product-list/ProductList";
import Review_detail from "./sample/Review_detail";

export default function ProductDetails({ product }) {
    // Props destructuring
    const {
        productId, productName, description, origin,
        height, length, weight, price, specialPrice,
        soldCount, reviewCount, avgRating, discount,
        inventory, category,
    } = product;
    const navigate = useNavigate();
    const { data: user } = useUserInfor();
    // --- State & Hooks ---
    const [selectedImage, setSelectedImage] = useState(logo);
    const [quantityProduct, setQuantityProduct] = useState(1);

    // Data Fetching
    const { data: images, isLoading: imgLoading } = useFindImageByProductId(productId);
    const { data: relatedData } = useProducts(0, 5, "productId", "asc");
    const productList = relatedData?.data?.data?.content || [];
    const { data: reviewData } = useFindReviewByProductId({ productId });
    const { mutate: addItem, isLoading: addingCart } = useAddItemToCart();


    const reviews = reviewData?.reviews || [];

    // Effect: Set ảnh mặc định khi load xong
    useEffect(() => {
        if (images && images.length > 0) {
            setSelectedImage(images[0]);
        }
    }, [images]);

    const handleIncreaseQuantity = () => {
        if (quantityProduct < (inventory?.available || 0)) {
            setQuantityProduct(prev => prev + 1);
        } else {
            notify.info("Đã đạt giới hạn số lượng trong kho!");
        }
    };

    const handleDecreaseQuantity = () => {
        if (quantityProduct > 1) setQuantityProduct(prev => prev - 1);
    };

    const handleAddToCart = () => {
        if (!user?.userProfile?.cartResponse?.cartId) return notify.error("Vui lòng đăng nhập!");
        addItem({
            cartId: user.userProfile.cartResponse.cartId,
            productId,
            quantity: quantityProduct
        })
    };

    const handleClickBuyNow = () => {
        if (quantityProduct < 1) return notify.info("Số lượng không hợp lệ");
        navigate(`/order`, {
            state: { mode: "single", product, images, productId, quantity: quantityProduct }
        });
    };



    if (imgLoading) return <Loading />;

    // --- Helper Components ---
    const Breadcrumb = () => (
        <nav className="text-sm text-gray-500 mb-6 font-medium">
            <span className="hover:text-blue-600 cursor-pointer" onClick={() => navigate('/')}>Trang chủ</span>
            <span className="mx-2">/</span>
            <span className="hover:text-blue-600 cursor-pointer">{category?.categoryName || "Sản phẩm"}</span>
            <span className="mx-2">/</span>
            <span className="text-gray-800 truncate">{productName}</span>
        </nav>
    );

    const TrustBadges = () => (
        <div className="grid grid-cols-2 gap-4 mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100">
            <div className="flex items-center gap-3 text-sm text-gray-700">
                <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600 text-lg" />
                <span>Bảo hành chính hãng</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
                <FontAwesomeIcon icon={faExchangeAlt} className="text-blue-600 text-lg" />
                <span>Đổi trả trong 7 ngày</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
                <FontAwesomeIcon icon={faTruckFast} className="text-blue-600 text-lg" />
                <span>Giao hàng toàn quốc</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
                <FontAwesomeIcon icon={faCheckCircle} className="text-blue-600 text-lg" />
                <span>Kiểm tra hàng trước khi nhận</span>
            </div>
        </div>
    );

    return (
        <div className="bg-white min-h-screen pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <Breadcrumb />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                    {/* LEFT: IMAGE GALLERY (5 cols) */}
                    <div className="lg:col-span-5">
                        <div className="relative w-full aspect-square bg-gray-100 rounded-2xl overflow-hidden shadow-sm mb-4 group">
                            <img
                                src={selectedImage}
                                alt={productName}
                                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
                            />
                            {discount > 0 && (
                                <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
                                    -{discount}%
                                </span>
                            )}
                        </div>
                        <div className="grid grid-cols-5 gap-3">
                            {images?.map((img, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setSelectedImage(img)}
                                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all
                                        ${selectedImage === img ? "border-blue-600 ring-2 ring-blue-100" : "border-gray-200 hover:border-gray-300"}
                                    `}
                                >
                                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: PRODUCT INFO (7 cols) */}
                    <div className="lg:col-span-7 flex flex-col">
                        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
                            {productName}
                        </h1>

                        {/* Rating & Sold */}
                        <div className="flex items-center gap-4 text-sm mb-6 pb-6 border-b border-gray-100">
                            <div className="flex items-center text-yellow-400 gap-1">
                                <span className="font-bold text-gray-900 text-base underline">{convertAvgRating(avgRating)}</span>
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <span className="text-gray-500">{reviewCount || 0} Đánh giá</span>
                            <div className="h-4 w-px bg-gray-300"></div>
                            <span className="text-gray-500">Đã bán <span className="text-gray-900 font-semibold">{soldCount ? convertSoldCount(soldCount) : 0}</span></span>
                        </div>

                        {/* Price Section */}
                        <div className="bg-gray-50 rounded-xl p-5 mb-6">
                            <div className="flex items-end gap-3">
                                <span className="text-4xl font-bold text-red-600">
                                    {formatCurrency(specialPrice)}
                                </span>
                                {discount > 0 && (
                                    <span className="text-lg text-gray-400 line-through mb-1">
                                        {formatCurrency(price)}
                                    </span>
                                )}
                            </div>
                            {discount > 0 && (
                                <p className="text-red-500 text-sm font-medium mt-1">
                                    Tiết kiệm: {formatCurrency(price - specialPrice)}
                                </p>
                            )}
                        </div>

                        {/* Description Preview */}
                        <div className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                            {description}
                        </div>

                        {/* Actions Form */}
                        <div className="mt-auto">
                            <div className="flex items-center mb-6">
                                <span className="font-medium text-gray-700 mr-6">Số lượng:</span>
                                <div className="flex items-center border border-gray-300 rounded-lg bg-white">
                                    <button
                                        onClick={handleDecreaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-l-lg transition"
                                        disabled={quantityProduct <= 1}
                                    >
                                        <FontAwesomeIcon icon={faMinus} size="xs" />
                                    </button>
                                    <input
                                        type="text"
                                        value={quantityProduct}
                                        readOnly
                                        className="w-12 h-10 text-center font-semibold text-gray-900 border-x border-gray-300 focus:outline-none"
                                    />
                                    <button
                                        onClick={handleIncreaseQuantity}
                                        className="w-10 h-10 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-r-lg transition"
                                    >
                                        <FontAwesomeIcon icon={faPlus} size="xs" />
                                    </button>
                                </div>
                                <span className="ml-4 text-sm text-gray-500">
                                    {inventory?.available > 0 ? `${inventory.available} sản phẩm có sẵn` : <span className="text-red-500">Hết hàng</span>}
                                </span>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={addingCart}
                                    className="flex-1 px-8 py-4 bg-blue-50 text-blue-700 font-bold rounded-xl border-2 border-blue-100 hover:bg-blue-100 hover:border-blue-200 transition-all flex items-center justify-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faShoppingCart} />
                                    {addingCart ? "Đang thêm..." : "Thêm vào giỏ"}
                                </button>
                                <button
                                    onClick={handleClickBuyNow}
                                    className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl hover:from-blue-700 hover:to-blue-800 transition-all transform hover:-translate-y-0.5"
                                >
                                    Mua Ngay
                                </button>
                            </div>

                            {/* Trust Badges */}
                            <TrustBadges />
                        </div>
                    </div>
                </div>

                {/* --- DETAILS & SPECS SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-16">
                    <div className="lg:col-span-4 order-2 lg:order-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Thông số kỹ thuật</h3>
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
                            <table className="w-full text-sm text-left text-gray-600">
                                <tbody>
                                    {[
                                        { label: "Xuất xứ", value: origin },
                                        { label: "Chiều cao", value: height ? `${height} cm` : "N/A" },
                                        { label: "Chiều dài", value: length ? `${length} cm` : "N/A" },
                                        { label: "Chiều rộng", value: product.width ? `${product.width} cm` : "N/A" },
                                        { label: "Cân nặng", value: weight ? `${weight} kg` : "N/A" },
                                        { label: "Kho hàng", value: inventory?.available || 0 },
                                    ].map((row, index) => (
                                        <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                                            <td className="px-4 py-3 font-medium text-gray-900 w-1/3">{row.label}</td>
                                            <td className="px-4 py-3">{row.value}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Mô tả chi tiết */}
                    <div className="lg:col-span-8 order-1 lg:order-2">
                        <h3 className="text-xl font-bold text-gray-900 mb-4">Mô tả sản phẩm</h3>
                        <div className="prose max-w-none text-gray-700 bg-gray-50 p-6 rounded-xl border border-gray-100">
                            <p className="whitespace-pre-line">{description}</p>
                        </div>
                    </div>
                </div>

                {/* --- REVIEWS SECTION --- */}
                <div className="mt-16 pt-10 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Đánh giá từ khách hàng</h2>
                    {reviews.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {reviews.map((rv, idx) => (
                                <Review_detail review={rv} key={idx} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10 bg-gray-50 rounded-xl text-gray-500">
                            Chưa có đánh giá nào cho sản phẩm này.
                        </div>
                    )}
                </div>

                {/* --- RELATED PRODUCTS --- */}
                <div className="mt-16 pt-10 border-t border-gray-200">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Sản phẩm có thể bạn thích</h2>
                    <ProductList products={productList} />
                </div>
            </div>
        </div>
    );
}