import { useSearchParams } from "react-router-dom";
import useSearchProductUser from "../hooks/product/useSearchProductUser";
import Loading from "../utils/Loading";
import ProductList from "../components/product-list/ProductList";
import { useMemo } from "react";

import ProductFilterBar from "../components/SearchProduct_Page/ProductFilterSidebar"; 
import Breadcrumb from "../components/SearchProduct_Page/Breadcrumb";
import SearchResultHeader from "../components/SearchProduct_Page/SearchResultHeader";

const SORT_OPTIONS = {
    NEWEST: "createAt,desc",
    PRICE_ASC: "price,asc",
    PRICE_DESC: "price,desc",
    BEST_SELLER: "soldCount,desc",
};


export default function ProductSearch_Page() {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = searchParams.get("page") !== null ? Number(searchParams.get("page")) : 0;
    const sortParam = searchParams.get("sort") || SORT_OPTIONS.NEWEST;
    const keywordParam = searchParams.get("keyword");
    const categoryNameParam = searchParams.get("categoryName");

    const paramsSearch = useMemo(() => ({
        keyword: keywordParam,
        categoryName: categoryNameParam,
        minPrice: searchParams.get("minPrice") !== null ? Number(searchParams.get("minPrice")) : null,
        maxPrice: searchParams.get("maxPrice") !== null ? Number(searchParams.get("maxPrice")) : null,
        hasDiscount: searchParams.get("hasDiscount") === "true",
        bestSeller: searchParams.get("bestSeller") === "true",
        origin: searchParams.get("origin"),
        page: currentPage,
        size: 20,
        sort: sortParam,
    }), [searchParams, currentPage, sortParam, keywordParam, categoryNameParam]);

    const { data: searchData, isLoading, isError } = useSearchProductUser(paramsSearch);


    const handleSortChange = (newSort) => {
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), sort: newSort, page: "0" });
    };

    const handlePageChange = ({ selected }) => {
        setSearchParams({ ...Object.fromEntries(searchParams.entries()), page: selected.toString() });
    };


    const products = searchData?.data?.content || [];
    const totalPages = searchData?.data?.page?.totalPages || 0;
    const totalElements = searchData?.data?.page?.totalElements || 0;

    const breadcrumbItems = useMemo(() => {
        const items = [{ label: "Tìm kiếm", link: "/search" }];
        if (keywordParam) items.push({ label: `"${keywordParam}"`, link: "" });
        return items;
    }, [keywordParam]);


    if (isLoading) return <Loading fullScreen={true} />; 
    if (isError) return (
        <div className="max-w-7xl mx-auto px-4 py-8"><div className="text-center py-20 text-red-500 text-lg bg-white shadow-lg rounded-xl">Đã xảy ra lỗi: {isError.message}</div></div>
    );
    
    if (products.length === 0 && !isLoading) {
        return (
            <div className="max-w-7xl mx-auto px-4 py-8">
                <Breadcrumb items={breadcrumbItems} />
                <div className="text-center py-20 text-gray-500 text-lg bg-white shadow-lg rounded-xl border border-gray-200">
                    <p className="text-2xl font-bold mb-3 text-gray-800">Không tìm thấy sản phẩm nào!</p>
                </div>
            </div>
        );
    }


    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                
                <Breadcrumb items={breadcrumbItems} />

                <SearchResultHeader 
                    keyword={keywordParam}
                    totalElements={totalElements}
                />
                
                <ProductFilterBar
                    searchParams={searchParams}
                    setSearchParams={setSearchParams}
                    sortParam={sortParam}
                    onSortChange={handleSortChange}
                />
                
                <div className="w-full space-y-4 p-4 bg-white shadow-lg rounded-xl">
                    <h2 className="text-2xl font-extrabold text-gray-900 mb-6 border-b-2 border-blue-500 inline-block pb-1">
                        Danh sách sản phẩm
                    </h2>

                    <ProductList
                        products={products}
                        totalPages={totalPages}
                        page={currentPage}
                        setPage={handlePageChange}
                        isLoading={false}
                    />
                </div>
            </div>
        </div>
    );
}