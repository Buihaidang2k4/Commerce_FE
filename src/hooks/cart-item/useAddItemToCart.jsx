import { useMutation, useQueryClient } from "@tanstack/react-query"
import cartItemService from "../../services/cartItemService";
import { notify } from "../../utils/notify";

export default function useAddItemToCart() {
  const queryClient = useQueryClient();

  return useMutation(
    {
      mutationKey:["add-cart-item"],
      mutationFn: cartItemService.addItemToCart,

      onSuccess: () => {
        queryClient.invalidateQueries(['cart'])
        notify.success("Thêm sản phẩm vào giỏ hàng thành công!");
      },

      onError: (error) => {
        notify.error("Sản phẩm đã hết hàng ! ");
        console.error("Add item to cart failed:", error);
      }
   
    }
  )
}
