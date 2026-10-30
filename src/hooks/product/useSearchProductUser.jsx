import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import productService from "../../services/productService";

const normalizeParams = (params = {}) =>
    Object.fromEntries(
        Object.entries(params).filter(
            ([_, value]) => value !== null && value !== undefined
        )
    );

export default function useSearchProductUser(rawParams) {
    const params = useMemo(
        () => normalizeParams(rawParams),
        [rawParams]
    );
    return useQuery({
        queryKey: ["search-products", params],
        queryFn: () => productService.searchByUsers(params),
        staleTime: 5000,
        keepPreviousData: true,
    });
}
