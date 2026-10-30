import React, { useEffect, useRef } from "react";
import ReactPaginate from "react-paginate";
import ProductCard from "./ProductCard";
import Loading from "@/utils/Loading"; // Giả sử bạn có component Loading

function ProductList({ products = [], totalPages = 1, page, setPage: onPageChange, isLoading }) {
  const listRef = useRef(null);

  const handlePageChange = ({ selected }) => {
    if (onPageChange) {
      onPageChange({ selected });
    }
  };

  // Tự động cuộn lên đầu danh sách khi chuyển trang
  useEffect(() => {
    if (listRef.current) {
      const y = listRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [page]);

  return (
    <div ref={listRef} className="px-4 py-8 max-w-7xl mx-auto min-h-[800px] relative">

      <h2 className="relative text-2xl font-bold mb-8 text-gray-800 text-center">
        <span className="px-4 bg-white relative z-10">Danh sách sản phẩm</span>
        <span className="absolute left-0 right-0 top-1/2 h-[2px] bg-gradient-to-r from-transparent via-sky-400 to-transparent rounded-full"></span>
      </h2>

      <div className="relative">
        {/* Loading Overlay: Che mờ danh sách khi đang load */}
        {isLoading && (
          <div className="absolute inset-0 z-20 bg-white/60 backdrop-blur-[1px] flex items-start pt-20 justify-center transition-all duration-300">
            <Loading />
          </div>
        )}

        {/* Danh sách sản phẩm */}
        <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 gap-y-6 mb-8 transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          {products.length > 0 ? (
            products.map((p) => (
              <div key={p.productId} className="h-full">
                <ProductCard product={p} />
              </div>
            ))
          ) : (
            !isLoading && (
              <div className="col-span-full text-center text-gray-500 py-10">
                Không tìm thấy sản phẩm nào.
              </div>
            )
          )}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <ReactPaginate
          previousLabel={"<"}
          nextLabel={">"}
          breakLabel={"..."}
          pageCount={totalPages}
          onPageChange={handlePageChange}
          forcePage={page}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          containerClassName={"flex justify-center items-center gap-2 mt-4 select-none"}
          pageClassName={"block"}
          pageLinkClassName={"w-8 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-sky-50 hover:text-sky-600 transition cursor-pointer text-sm font-medium"}
          activeClassName={"!border-sky-500"}
          activeLinkClassName={"!bg-sky-500 !text-white border-sky-500"}
          previousClassName={"block"}
          nextClassName={"block"}
          previousLinkClassName={"px-3 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-sky-50 transition cursor-pointer text-sm"}
          nextLinkClassName={"px-3 h-8 flex items-center justify-center rounded-md border border-gray-200 bg-white text-gray-600 hover:bg-sky-50 transition cursor-pointer text-sm"}
          disabledClassName={"opacity-50 cursor-not-allowed"}
          disabledLinkClassName={"cursor-not-allowed hover:bg-white hover:text-gray-600"}
        />
      )}
    </div>
  );
}

export default React.memo(ProductList);