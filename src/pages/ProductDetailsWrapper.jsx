import { useSearchParams } from "react-router-dom";
import useFindByProductId from "../hooks/product/useFindByProductId";
import ProductDetails from "@/components/product-details/ProductDetails";
import Loading from "../utils/Loading";
import Error from "../utils/Error";

export default  function ProductDetailsWrapper() {
    const [searchParams] = useSearchParams();
    const productId = Number(searchParams.get("productId"));

    const { data, isLoading, isError } = useFindByProductId(productId);
    if (isLoading) return <Loading/>;
    if (isError) return <Error/>;

    return <ProductDetails product={data.data.data} />;
}

