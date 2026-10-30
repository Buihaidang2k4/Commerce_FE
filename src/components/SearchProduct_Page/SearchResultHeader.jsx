
export default function SearchResultHeader({ keyword, totalElements }) {
    const title = keyword || "Tất cả sản phẩm";

    return (
        <div className="mb-4 p-6 bg-white rounded-xl shadow-sm border border-gray-100">
            <h1 className="text-2xl font-extrabold text-gray-900 leading-tight">
                Kết quả tìm kiếm cho: 
                <span className="text-blue-600 ml-2">"{title}"</span>
            </h1>
            
            <p className="text-md text-gray-600 mt-1 font-medium">
                Tìm thấy <span className="font-bold text-blue-600">{totalElements.toLocaleString()}</span> sản phẩm.
            </p>
        </div>
    );
}