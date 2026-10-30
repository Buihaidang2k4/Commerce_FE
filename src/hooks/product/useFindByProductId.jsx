import React from 'react'
import { useQuery } from '@tanstack/react-query'
import productService from '../../services/productService'


export default function useFindByProductId(productId) {
  return useQuery({
        queryKey: ["products",productId],
        queryFn: () => productService.getProductById(productId),
        keepPreviousData: true,
        staleTime: 5000
    })
}
