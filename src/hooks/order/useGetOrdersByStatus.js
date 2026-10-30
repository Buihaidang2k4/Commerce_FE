import { useQuery } from '@tanstack/react-query'
import orderSevice from '../../services/orderService'

export default function useGetOrdersByStatus({ orderStatus, page, size, sortBy, direction }) {
    return useQuery(
        {
            queryKey: ['orders', orderStatus, page, size, sortBy, direction],
            queryFn: () => orderSevice.getOrders({ orderStatus, page, size, sortBy, direction }),
            enabled: !!orderStatus,
            staleTime: 1000 * 60 * 10,
            keepPreviousData: true

        }
    )
}
