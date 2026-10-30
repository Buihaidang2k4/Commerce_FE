import { useQuery } from '@tanstack/react-query'
import React from 'react'
import productService from '../../services/productService'

export default function useFindProductByCategoryName(categoryName = "", page = 0, size = 10, sortBy = "productId", direction = "asc") {
    return useQuery({
        queryKey: ["products",categoryName, page, size, sortBy, direction],
        queryFn: () => productService.getProductByCategoryName(categoryName, page, size, sortBy, direction),
        keepPreviousData: true,
        staleTime: 5000
    })
}
