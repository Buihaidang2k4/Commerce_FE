import { useMutation, useQueryClient } from "@tanstack/react-query";
import cartItemService from "../../services/cartItemService";

const useUpdateCartItemQuantity = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ cartId, cartItemId, quantity }) =>
            cartItemService.updateItemQuantity(cartId, cartItemId, quantity),

        onMutate: async ({ cartId, cartItemId, quantity }) => {
            await queryClient.cancelQueries(["cart", cartId]);

            const previousCart = queryClient.getQueryData(["cart", cartId]);

            queryClient.setQueryData(["cart", cartId], old => ({
                ...old,
                items: old.items.map(item =>
                    item.id === cartItemId
                        ? { ...item, quantity }
                        : item
                ),
            }));

            return { previousCart };
        },

        onError: (_err, { cartId }, context) => {
            queryClient.setQueryData(["cart", cartId], context.previousCart);
        },

        onSettled: (_data, _error, { cartId }) => {
            queryClient.invalidateQueries(["cart", cartId]);
        },
    });
};

export default useUpdateCartItemQuantity;
