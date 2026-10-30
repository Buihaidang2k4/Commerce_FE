import { useReducer } from "react"
import useGetAllCategory from "../../hooks/category/useCategory"
import Loading from "../../utils/Loading";

const PARAM_NAME = {
    HAS_DISCOUNT: "hasDiscount",
    CATEGORY_NAME: "categoryName",
    BEST_SELLER: "bestSeller",
    MIN_PRICE: "minPrice",
    MAX_PRICE: "maxPrice",
    ORIGIN: "origin",
}

const initialSearchParams =
{
    keyword: null,
    categoryName: null,
    minPrice: null,
    maxPrice: null,
    hasDiscount: false,
    bestSeller: false,
    rating: null,
    origin: null,
};

function searchReducer(state, action) {
    switch (action.type) {
        case "SET_PARAM":
            return { ...state, [action.key]: action.value };

        case "RESET":
            // reset về mặc định
            return initialSearchParams;

        case "SET_MULTIPLE":
            // cập nhật nhiều field cùng lúc
            return { ...state, ...action.payload };

        default:
            return state;
    }
}

const country = {
    vietnam: "Việt Nam",
    china: "Trung Quốc",
    korea: "Hàn Quốc",
    japan: "Nhật Bản",
    usa: "Mỹ",
    eu: "Châu Âu",
}


export default function FormSearchFilter({ onApply }) {
    const [paramsSearch, dispatch] = useReducer(searchReducer, initialSearchParams);
    const { categories, error, isLoading } = useGetAllCategory();

    const handlePriceExample = (minPrice, maxPrice) => {
        dispatch({ type: "SET_MULTIPLE", payload: { minPrice, maxPrice } });
    }

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        let finalValue = value;

        if (type === "checkbox") {
            finalValue = checked;
        } else if (type === "number") {
            finalValue = value === "" ? null : Number(value);
        } else if (value === "") {
            finalValue = null;
        }

        dispatch({ type: "SET_PARAM", key: name, value: finalValue });
    };

    const handleReset = () => {
        dispatch({ type: "RESET" });
        dispatch({
            type: "SET_MULTIPLE",
            payload: { minPrice: 0, maxPrice: 0 }
        });

    }

    const handleApply = () => {
        onApply(paramsSearch);
    }



    if (isLoading) return <Loading />;
    if (error) {
        console.error(error);
    }

    return (
      <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 p-5 z-50 max-h-[80vh] overflow-y-auto">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5"> {/* Giảm gap từ 8 → 5, sm mới 2 cột */}
    {/* Lọc nhanh */}
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800 text-base">Lọc nhanh</h4>
      <div className="flex flex-wrap gap-3">
        <label className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition ${paramsSearch.hasDiscount ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          <input type="checkbox" name={PARAM_NAME.HAS_DISCOUNT} checked={paramsSearch.hasDiscount} onChange={handleChange} className="hidden" />
          Giảm giá mạnh
        </label>
        <label className={`px-4 py-1.5 rounded-lg text-sm font-medium cursor-pointer transition ${paramsSearch.bestSeller ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
          <input type="checkbox" name={PARAM_NAME.BEST_SELLER} checked={paramsSearch.bestSeller} onChange={handleChange} className="hidden" />
          Bán chạy
        </label>
      </div>
    </div>

    {/* Khoảng giá */}
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800 text-base">Khoảng giá</h4>
      <div className="flex items-center gap-3">
        <input type="number" placeholder="Từ" name={PARAM_NAME.MIN_PRICE} value={paramsSearch.minPrice ?? ""} onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
        <span className="text-gray-400">—</span>
        <input type="number" placeholder="Đến" name={PARAM_NAME.MAX_PRICE} value={paramsSearch.maxPrice ?? ""} onChange={handleChange}
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm" />
      </div>
      <div className="flex flex-wrap gap-2">
        <button onClick={() => handlePriceExample(0, 500000)} className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-blue-50">Dưới 500k</button>
        <button onClick={() => handlePriceExample(500000, 1000000)} className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-blue-50">500k - 1tr</button>
        <button onClick={() => handlePriceExample(1000000, 2000000)} className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-blue-50">1tr - 2tr</button>
        <button onClick={() => handlePriceExample(2000000, null)} className="text-xs px-3 py-1.5 border border-gray-300 rounded hover:bg-blue-50">Trên 2tr</button>
      </div>
    </div>

    {/* Nguồn gốc */}
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800 text-base">Nguồn gốc</h4>
      <select name={PARAM_NAME.ORIGIN} value={paramsSearch.origin || ""} onChange={handleChange}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm">
        <option value="">Tất cả</option>
        {Object.entries(country).map(([value, label]) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>

    {/* Danh mục */}
    <div className="space-y-3">
      <h4 className="font-semibold text-gray-800 text-base">Danh mục</h4>
      <select name={PARAM_NAME.CATEGORY_NAME} value={paramsSearch.categoryName || ""} onChange={handleChange}
        className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm">
        <option value="">Tất cả</option>
        {categories?.map((category) => (
          <option key={category.categoryId} value={category.categoryName}>
            {category.categoryName}
          </option>
        ))}
      </select>
    </div>
  </div>

  {/* Nút hành động - gọn hơn */}
  <div className="flex justify-end gap-3 mt-5 pt-4 border-t border-gray-100">
    <button onClick={handleReset} className="px-5 py-2 text-gray-600 font-medium rounded-lg hover:bg-gray-100 text-sm">
      Đặt lại
    </button>
    <button onClick={handleApply} className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 text-sm">
      Áp dụng
    </button>
  </div>
</div>
    )
}
