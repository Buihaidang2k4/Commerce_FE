import useCategory from '@/hooks/category/useCategory';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../../utils/Loading';

export default function Category() {
  const { categories, loading } = useCategory();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const handleCategoryClick = (id, name) => {
    setSelectedCategory(id);
    navigate(id === "all" ? '/search-page-by-category' : `/search-page-by-category?categoryName=${name}`);
  };

  if (loading) return <Loading />;

  return (
    <div className="w-full bg-white border-b border-gray-200 mt-5">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide">
          
          {/* Helper function để render nút tránh lặp code */}
          {[ { categoryId: 'all', categoryName: 'All' }, ...categories ].map((item) => (
            <button
              key={item.categoryId}
              onClick={() => handleCategoryClick(item.categoryId, item.categoryName)}
              className={`
                relative whitespace-nowrap py-4 text-sm font-medium transition-colors duration-200
                ${selectedCategory === item.categoryId
                  ? "text-blue-600"
                  : "text-gray-500 hover:text-gray-800"
                }
              `}
            >
              {item.categoryName}
              
              {/* Thanh gạch chân animation */}
              <span className={`
                absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 rounded-t-md transition-transform duration-300 origin-center
                ${selectedCategory === item.categoryId ? "scale-x-100" : "scale-x-0"}
              `}></span>
            </button>
          ))}

        </div>
      </div>
    </div>
  );
}