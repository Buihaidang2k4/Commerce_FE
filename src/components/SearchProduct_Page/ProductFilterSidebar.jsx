// components/ProductFilterBar.jsx
import React, { useState, useEffect } from 'react';
import { SORT_OPTIONS } from './ProductSortBar'; // Tái sử dụng SORT_OPTIONS

const FilterDropdown = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left">
            <button
                type="button"
                className={`inline-flex justify-center w-full rounded-full border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-150 ${isOpen ? 'bg-gray-100' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {title}
                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
            </button>

            {isOpen && (
                <div 
                    className="absolute z-10 mt-2 w-64 origin-top-right rounded-lg shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none p-4"
                    onBlur={() => setIsOpen(false)} 
                >
                    {children}
                </div>
            )}
        </div>
    );
};

const PriceFilter = ({ searchParams, setSearchParams, minPrice, setMinPrice, maxPrice, setMaxPrice, handlePriceFilter }) => (
    <form onSubmit={handlePriceFilter} className="space-y-3">
        <h3 className="font-semibold text-gray-800 border-b pb-2">Khoảng Giá (VNĐ)</h3>
        <div className="flex gap-2 items-center">
            <input
                type="number"
                placeholder="Tối thiểu"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
            />
            <span className="text-gray-500">-</span>
            <input
                type="number"
                placeholder="Tối đa"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md text-sm"
            />
        </div>
        <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white rounded-md font-medium hover:bg-blue-700 transition duration-200 text-sm"
        >
            Áp dụng
        </button>
    </form>
);

const ToggleFilterItem = ({ label, paramKey, searchParams, updateFilter }) => {
    const isChecked = searchParams.get(paramKey) === "true";
    return (
        <label 
            className="flex items-center space-x-2 text-sm py-1.5 cursor-pointer hover:text-blue-600 transition"
            onClick={() => updateFilter(paramKey, !isChecked)}
        >
            <input
                type="checkbox"
                checked={isChecked}
                readOnly
                className="form-checkbox text-blue-600 rounded"
            />
            <span className="text-gray-700">{label}</span>
        </label>
    );
};

export default function ProductFilterBar({ searchParams, setSearchParams, sortParam, onSortChange }) {
    const currentMinPrice = searchParams.get("minPrice") || "";
    const currentMaxPrice = searchParams.get("maxPrice") || "";
    const [minPrice, setMinPrice] = useState(currentMinPrice);
    const [maxPrice, setMaxPrice] = useState(currentMaxPrice);
    
    useEffect(() => {
        setMinPrice(currentMinPrice);
        setMaxPrice(currentMaxPrice);
    }, [currentMinPrice, currentMaxPrice]);

    const updateFilter = (key, value) => {
        const currentParams = Object.fromEntries(searchParams.entries());
        currentParams.page = "0"; 

        const finalValue = value ? (key === 'hasDiscount' || key === 'bestSeller' ? 'true' : value.toString()) : '';
        
        if (finalValue === '') {
            delete currentParams[key];
        } else {
            currentParams[key] = finalValue;
        }
        setSearchParams(currentParams);
    };

    const handlePriceFilter = (e) => {
        e.preventDefault();
        const currentParams = Object.fromEntries(searchParams.entries());
        currentParams.page = "0";

        if (minPrice && Number(minPrice) >= 0) currentParams.minPrice = minPrice;
        else delete currentParams.minPrice;
        
        if (maxPrice && Number(maxPrice) >= 0) currentParams.maxPrice = maxPrice;
        else delete currentParams.maxPrice;

        setSearchParams(currentParams);
    };

    const sortItems = [
        { label: "Mới nhất", value: SORT_OPTIONS.NEWEST },
        { label: "Giá thấp → cao", value: SORT_OPTIONS.PRICE_ASC },
        { label: "Giá cao → thấp", value: SORT_OPTIONS.PRICE_DESC },
        { label: "Bán chạy", value: SORT_OPTIONS.BEST_SELLER },
    ];
    
    return (
        <div className="flex flex-wrap items-center justify-between p-4 bg-white shadow-md rounded-xl border border-gray-100 mb-6">
            
            <div className="flex flex-wrap items-center gap-3">
                <span className="text-gray-700 text-sm font-medium">Bộ lọc:</span>
                
                <FilterDropdown title="Khoảng Giá">
                    <PriceFilter 
                        searchParams={searchParams} setSearchParams={setSearchParams}
                        minPrice={minPrice} setMinPrice={setMinPrice}
                        maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                        handlePriceFilter={handlePriceFilter}
                    />
                </FilterDropdown>

                <FilterDropdown title="Tiêu chí khác">
                    <div className="space-y-1">
                        <ToggleFilterItem label="Đang giảm giá" paramKey="hasDiscount" searchParams={searchParams} updateFilter={updateFilter} />
                        <ToggleFilterItem label="Bán chạy" paramKey="bestSeller" searchParams={searchParams} updateFilter={updateFilter} />
                    </div>
                </FilterDropdown>

                <FilterDropdown title={`Xuất xứ: ${searchParams.get('origin') || 'Tất cả'}`}>
                     <div className="space-y-1">
                        <h3 className="font-semibold text-gray-800 border-b pb-2 mb-2">Chọn Xuất xứ</h3>
                        {["Việt Nam", "Hàn Quốc", "Mỹ", "Trung Quốc"].map(origin => (
                            <div key={origin}>
                                <label 
                                    className="flex items-center space-x-2 text-sm py-1.5 cursor-pointer hover:text-blue-600 transition"
                                    onClick={() => updateFilter("origin", searchParams.get("origin") === origin ? "" : origin)}
                                >
                                    <input
                                        type="radio"
                                        readOnly
                                        checked={searchParams.get("origin") === origin}
                                        className="form-radio text-blue-600"
                                    />
                                    <span className="text-gray-700">{origin}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                </FilterDropdown>
            </div>


            <div className="flex flex-wrap items-center gap-2 mt-4 lg:mt-0">
                <span className="text-gray-700 text-sm font-medium">Sắp xếp theo:</span>
                
                {sortItems.map(({ label, value }) => {
                    const isActive = sortParam === value;
                    return (
                        <button
                            key={value}
                            onClick={() => onSortChange(value)}
                            className={`px-4 py-2 text-sm rounded-full font-semibold transition duration-200
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
        </div>
    );
}