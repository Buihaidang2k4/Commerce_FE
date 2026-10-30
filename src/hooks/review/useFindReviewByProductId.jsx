// useFindReviewByProductId.js
import { useQuery } from "@tanstack/react-query";
import reviewService from "@/services/reviewService";
import { data } from "react-router-dom";

export default function useFindReviewByProductId({
    productId,
    page = 0,
    size = 10,
    sortBy = "createdAt",
    direction = "desc",
}) {
    return useQuery({
        queryKey: ["product-reviews", productId, page, size, sortBy, direction],
        queryFn: async () => {
            const responseData = await reviewService.getReviewsByProductId(productId, { page, size, sortBy, direction })
            return responseData.data;
        },
        select: (data) => ({
            reviews: data.data.content, 
            totalItems: data.data.totalItems,
            totalPages: data.data.totalPages,
            size: data.data.size,
            currentPage: data.data.currentPage,
        }),
        enabled: !!productId,
        keepPreviousData: true,
        staleTime: 1000 * 60,
        retry: 1,
    });
}