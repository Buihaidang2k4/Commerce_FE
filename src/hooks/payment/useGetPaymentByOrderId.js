import { useQuery } from '@tanstack/react-query'
import paymentService from '../../services/paymentService'

export default function useGetPaymentByOrderId(orderId) {
    return useQuery(
        {
            queryKey: ['payment', orderId],
            queryFn: () => paymentService.getPaymentByOrderId(orderId),
            enabled: !!orderId,
            staleTime: 5 * 60 * 1000,
            keepPreviousData: true,
        }
    )
}
