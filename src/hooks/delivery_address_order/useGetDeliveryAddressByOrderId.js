import { useQuery } from '@tanstack/react-query'
import React from 'react'
import addressOrderService from '../../services/addressOrderService'

export default function useGetDeliveryAddressByOrderId(orderId) {
    return useQuery(
        {
            queryKey: ['delivery-address', orderId],
            queryFn: () => addressOrderService.getDeliveryAddressByOrderId(orderId),
            enabled: !!orderId,
            staleTime: 5 * 60 * 1000,
            keepPreviousData: true,
        }
    )
}
