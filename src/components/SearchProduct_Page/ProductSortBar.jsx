export const SORT_OPTIONS = {
    NEWEST: "createAt,desc",
    PRICE_ASC: "price,asc",
    PRICE_DESC: "price,desc",
    BEST_SELLER: "soldCount,desc",
};

export default function ProductSortBar({ currentSort, onSortChange }) {
    const sortItems = [
        { label: "Mới nhất", value: SORT_OPTIONS.NEWEST },
        { label: "Giá thấp → cao", value: SORT_OPTIONS.PRICE_ASC },
        { label: "Giá cao → thấp", value: SORT_OPTIONS.PRICE_DESC },
        { label: "Bán chạy", value: SORT_OPTIONS.BEST_SELLER },
    ];
    
    return (
        <div className="flex flex-wrap items-center gap-2 p-3 bg-white rounded-lg mb-4">
            <span className="text-gray-700 text-sm font-medium mr-1">Sắp xếp theo:</span>
            
            {sortItems.map(({ label, value }) => {
                const isActive = currentSort === value;
                return (
                    <button
                        key={value}
                        onClick={() => onSortChange(value)}
                        className={`px-4 py-2 text-sm rounded-md font-semibold transition duration-200
                            ${isActive 
                                ? "bg-blue-600 text-white shadow-md hover:bg-blue-700" 
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`
                        }
                    >
                        {label}
                    </button>
                );
            })}
        </div>
    );
}