import { useQuery } from '@tanstack/react-query'
import cartItemService from '../../services/cartItemService'

export default function useGetItemByIds({ profileId, params }) {
    return useQuery({
        queryKey: ['cartItems', profileId, params],
        queryFn: () => cartItemService.getCartItemsByIds({ profileId, params }),
        keepPreviousData: true,
        staleTime: 1000 * 60,
        retry: 1,
        enabled: !!profileId && !!params && params?.ids?.length > 0
    })
}
