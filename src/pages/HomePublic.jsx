import { useState } from "react";
import ProductList from "../components/product-list/ProductList";
import useProducts from "@/hooks/product/useProducts.jsx";
import Category from "../components/Home/Category";

export default function HomePublic() {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError, isFetching } = useProducts(page, 10);
  const products = data?.data?.data?.content || [];
  const totalPages = data?.data?.data?.totalPages || 1;

  return (
    <>
      <Category />
      <div
        className="relative">
        <ProductList
          products={products}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      </div>

    </>
  );
}
