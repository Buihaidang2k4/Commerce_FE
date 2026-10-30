import useImageUrl from "@/hooks/image/useImageUrl"
import { useNavigate } from "react-router-dom"
export default function ProductCard({ product }) {
  const { productName, description, price, discount, specialPrice, category, images } = product

  const imageUrl = useImageUrl(images)
  const navigate = useNavigate()

  // check login
  function handleClickBuy() {
    return navigate(`/product-details?productId=${product?.productId}`)

  }

  function formatCurrency(value) {
    if (value == null) return ""
    return value.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
    })
  }

  const rating = product?.reviewCount || 5;
  const soldCount = product?.soldCount;

  return (
    <div
      className="relative bg-white rounded-lg shadow-md border border-gray-200 
                 overflow-hidden hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 
                 transition-all duration-300 group cursor-pointer"
    >
      {discount > 0 && (
        <span
          className="absolute top-2 right-2 bg-red-500 
                         text-white text-[10px] font-semibold px-2 py-0.5 rounded-md shadow-md z-10"
        >
          -{discount}%
        </span>
      )}

      <div className="relative h-32 w-full overflow-hidden bg-gray-50">
        <img
          src={imageUrl || "/placeholder.png"}
          alt={productName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-3 flex flex-col gap-1.5">
        <span
          className="inline-flex items-center gap-1 text-[10px] font-medium text-blue-600 
                         bg-blue-50 px-2 py-0.5 rounded-md w-fit border border-blue-100"
        >
          <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
          </svg>
          {category?.categoryName || "Không xác định"}
        </span>

        <h3
          className="text-sm font-bold text-gray-900 group-hover:text-blue-600 
                       transition-colors duration-200 line-clamp-2 leading-tight min-h-[2rem]"
        >
          {productName}
        </h3>

        <p className="text-[10px] text-gray-600 line-clamp-2 min-h-[1.5rem]">{description}</p>

        <div className="flex items-center gap-3 text-[10px]">
          <div className="flex items-center gap-1">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <svg
                  key={index}
                  className={`w-3 h-3 ${index < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-700 font-medium">{rating}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <span>Đã bán</span>
            <span className="font-semibold text-gray-700">{soldCount}</span>
          </div>
        </div>

        <div className="flex items-baseline gap-2 pt-1.5 border-t border-gray-100">
          <span className="text-lg font-bold text-red-500">{formatCurrency(specialPrice ? specialPrice : price)}</span>
          {discount > 0 && <span className="text-[10px] text-gray-400 line-through">{formatCurrency(price)}</span>}
        </div>

        <button
          onClick={() => handleClickBuy()}
          className="mt-2 w-full bg-blue-600 hover:bg-blue-700
                     text-white font-medium py-2 px-3 rounded-lg 
                     shadow-sm hover:shadow-md
                     transition-all duration-200 
                     flex items-center justify-center gap-1.5 group/btn
                     active:scale-98"
        >
          <svg
            className="w-3.5 h-3.5 group-hover/btn:scale-110 transition-transform duration-200"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="text-xs">Mua ngay</span>
        </button>
      </div>
    </div>
  )
}
