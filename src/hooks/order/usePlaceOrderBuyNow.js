import { useMutation, useQueryClient } from '@tanstack/react-query'
import orderService from '../../services/orderService'
import useOrderStore from '@/stores/useOrderStore'
import { notify } from '@/utils/notify'

export function usePlaceOrderBuyNow() {
    const queryClient = useQueryClient()
    const clearOrder = useOrderStore((s) => s.clearOrder)

    return useMutation({
        mutationFn: (data) =>
            orderService.placeOrderBuyNow({ data }),

        onSuccess: () => {
            notify.success('Đặt hàng thành công')
            clearOrder()
            queryClient.invalidateQueries(['orders'])
        },

        onError: (error) => {
            notify.error(
                'Đặt hàng thất bại'
            )
            console.error(error)
        },
    })
}
