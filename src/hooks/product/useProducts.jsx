import productService from "../../services/productService";
import "react-multi-carousel/lib/styles.css";
import {useQuery} from '@tanstack/react-query'

export default function useProducts(page = 0, size = 10, sortBy = "productId", direction = "asc") {
    return useQuery({
        queryKey: ["products",page,size],
        queryFn: () => productService.getAllProductsByPage(page,size,sortBy,direction),
        keepPreviousData: true,// giữ dứ liệu cũ không nhảy ui 
        staleTime:5000
    })
}
