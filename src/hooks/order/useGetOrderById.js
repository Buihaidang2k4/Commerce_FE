import { useQuery } from '@tanstack/react-query'
import React from 'react'
import orderSevice from '../../services/orderService';

export default function useGetOrderById(orderId) {
    return useQuery(
        {
            queryKey: ['order-details', orderId],
            queryFn: () => orderSevice.getOrderById(orderId),
            enabled: !!orderId,
            staleTime: 5 * 60 * 1000, // 5 minutes
            keepPreviousData: true,
        }
    )
}
