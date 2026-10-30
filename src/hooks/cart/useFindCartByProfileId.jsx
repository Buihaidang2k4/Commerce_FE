import { useQuery } from "@tanstack/react-query";
import cartService from "@/services/cartService";

export default function useFindCartByProfileId(profileId) {

    return useQuery(
        {
            queryKey: ['cart', profileId],
            queryFn: async () => {
                const res = await cartService.getCartByProfileId(profileId)
                return res?.data?.data;
            },
            select: (data) => {
                return {
                    cartId: data.cartId,
                    items: data.items.map((item) => ({
                        id: item.cartItemId,
                        productId: item.productId,
                        name: item.productName,
                        quantity: item.quantity,
                        price: item.unitPrice,
                        total: item.totalPrice,
                    })),
                    totalPrice: data.totalPrice,
                };
            },
            enabled: !!profileId,
        }
    )
}
