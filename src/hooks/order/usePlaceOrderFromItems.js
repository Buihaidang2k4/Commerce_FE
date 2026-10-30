import { useMutation, useQueryClient } from '@tanstack/react-query'
import useOrderStore from '../../stores/useOrderStore.jsx'
import orderSevice from '../../services/orderService.js';
import { notify } from '../../utils/notify.jsx';

export default function usePlaceOrderFromItems() {
    const queryClient = useQueryClient();
    const clearOrder = useOrderStore((state) => state.clearOrder);

    return useMutation(
        {
            mutationFn: (data) => orderSevice.placeOrderFromItems({ data }),

            onSuccess: () => {
                notify.success("Order placed successfully");
                queryClient.invalidateQueries({ queryKey: ['cart'] });
                queryClient.invalidateQueries({ queryKey: ['orders'] });
                clearOrder();
            },

            onError: (_err) => {
                notify.error("Failed to place order");
                console.error(_err);
            }
        }
    )
}
