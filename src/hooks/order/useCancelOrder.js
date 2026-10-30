import { useMutation, useQueryClient } from '@tanstack/react-query'
import orderService from '../../services/orderService'
import { notify } from '@/utils/Notify.jsx'

export default function useCancelOrder() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ orderId }) => orderService.cancelOrder(orderId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] })
      notify.success('Hủy đơn hàng thành công')
    },

    onError: (err) => {
      notify.error('Hủy đơn hàng thất bại')
      console.error(err)
    }
  })
}
