import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import useFindProductByCategoryName from "../hooks/product/useFindProductByCategoryName";
import ProductList from "../components/product-list/ProductList";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faTags, faClock, faFilter, faBoxOpen } from '@fortawesome/free-solid-svg-icons';

export default function SearchPageByCategory() {
    // State
    const [page, setPage] = useState(0);
    const [sortBy, setSortBy] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [activeSortValue, setActiveSortValue] = useState(0); // Để highlight nút đang chọn

    // Hooks
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const categoryName = queryParams.get("categoryName");

    // Fetch Data
    const { data, isLoading, isError } = useFindProductByCategoryName(
        categoryName ? categoryName : "",
        page,
        12, // Tăng lên 12 để chia cột đẹp hơn (chia hết cho 2, 3, 4)
        sortBy,
        sortDirection
    );

    // Reset page và sort khi category thay đổi
    useEffect(() => {
        setPage(0);
        setSortBy("");
        setSortDirection("");
        setActiveSortValue(0);
    }, [categoryName]);

    // Loading & Error
    if (isLoading) return <Loading />;
    if (isError) {
        console.error(isError);
        return <Error message={isError.message} />;
    }

    const products = data?.data?.data?.content || [];
    const totalPages = data?.data?.data?.totalPages || 0;
    const totalElements = data?.data?.data?.totalElements || 0;

    // Danh sách hành động
    const listAction = [
        { label: "Mặc định", value: 0, icon: faFilter },
        { label: "Mới nhất", value: 6, icon: faClock },
        { label: "Giá thấp đến cao", value: 1, icon: faArrowUp },
        { label: "Giá cao đến thấp", value: 2, icon: faArrowDown },
        { label: "Khuyến mãi tốt", value: 5, icon: faTags },
        { label: "Giá sau giảm tăng", value: 3, icon: faArrowUp },
        { label: "Giá sau giảm giảm", value: 4, icon: faArrowDown },
        { label: "Tên A → Z", value: 8, icon: faArrowUp },
        { label: "Tên Z → A", value: 9, icon: faArrowDown },
        { label: "Cập nhật gần đây", value: 7, icon: faClock },
    ];

    const handleClickAction = (action) => {
        setActiveSortValue(action); // Set active state
        setPage(0); // Reset về trang 1

        switch (action) {
            case 1: setSortBy("price"); setSortDirection("asc"); break;
            case 2: setSortBy("price"); setSortDirection("desc"); break;
            case 3: setSortBy("specialPrice"); setSortDirection("asc"); break;
            case 4: setSortBy("specialPrice"); setSortDirection("desc"); break;
            case 5: setSortBy("discount"); setSortDirection("desc"); break;
            case 6: setSortBy("createAt"); setSortDirection("desc"); break;
            case 7: setSortBy("updateAt"); setSortDirection("desc"); break;
            case 8: setSortBy("category.categoryName"); setSortDirection("asc"); break;
            case 9: setSortBy("category.categoryName"); setSortDirection("desc"); break;
            default: setSortBy("productId"); setSortDirection("asc");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header Section: Tiêu đề & Kết quả */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 border-b border-gray-200 pb-4 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
                            {categoryName ? categoryName : "Tất cả sản phẩm"}
                        </h1>
                        <p className="text-gray-500 mt-1 text-sm">
                            Tìm thấy <span className="font-semibold text-blue-600">{totalElements}</span> sản phẩm phù hợp
                        </p>
                    </div>
                </div>

                {/* Filter / Sort Bar */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 mb-8">
                    <div className="flex items-center gap-3 mb-3">
                        <span className="text-sm font-semibold text-gray-700 bg-gray-100 px-3 py-1 rounded-md">
                            <FontAwesomeIcon icon={faFilter} className="mr-2 text-gray-500" />
                            Sắp xếp theo:
                        </span>
                    </div>

                    {/* Horizontal Scroll List */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mask-linear-fade">
                        {listAction.map(({ label, value, icon }) => {
                            const isActive = activeSortValue === value;
                            return (
                                <button
                                    key={value}
                                    onClick={() => handleClickAction(value)}
                                    className={`
                                        group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border
                                        ${isActive 
                                            ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-200 hover:bg-blue-700" 
                                            : "bg-white border-gray-200 text-gray-600 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50"
                                        }
                                    `}
                                >
                                    <FontAwesomeIcon 
                                        icon={icon} 
                                        className={`text-xs transition-colors ${isActive ? "text-white" : "text-gray-400 group-hover:text-blue-500"}`} 
                                    />
                                    {label}
                                </button>
                            )
                        })}
                    </div>
                </div>

                {/* Product List Content */}
                {products && products.length > 0 ? (
                    <div className="animate-fade-in-up">
                        <ProductList
                            products={products}
                            totalPages={totalPages}
                            page={page}
                            setPage={setPage}
                        />
                    </div>
                ) : (
                    /* Empty State - Khi không có sản phẩm */
                    <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="bg-gray-50 p-6 rounded-full mb-4">
                            <FontAwesomeIcon icon={faBoxOpen} className="text-4xl text-gray-400" />
                        </div>
                        <h3 className="text-xl font-medium text-gray-900">Không tìm thấy sản phẩm nào</h3>
                        <p className="text-gray-500 mt-2 max-w-sm text-center">
                            Thử chọn danh mục khác hoặc thay đổi bộ lọc tìm kiếm của bạn.
                        </p>
                        <button 
                            onClick={() => handleClickAction(0)}
                            className="mt-6 text-blue-600 font-medium hover:underline"
                        >
                            Xóa bộ lọc
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}