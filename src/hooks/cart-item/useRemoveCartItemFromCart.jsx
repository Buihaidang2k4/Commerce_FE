import { useMutation, useQueryClient } from "@tanstack/react-query";
import cartItemService from "../../services/cartItemService";
import { notify } from "../../utils/notify";

export default function useRemoveItemFromCart() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["remove-cart-item"], // nhãn cho mutation
    mutationFn: cartItemService.removeItemFromCart,

    // Khi mutation thành công
    onSuccess: () => {
      queryClient.invalidateQueries(["cart"]); // refresh giỏ hàng
      notify.success("Xóa sản phẩm khỏi giỏ hàng thành công!");
    },

    // Khi mutation thất bại
    onError: (error) => {
      notify.error(error.response?.data?.message || "Xóa sản phẩm thất bại!");
      console.error("Remove item from cart failed:", error);
    },

    // Luôn chạy sau success hoặc error
    onSettled: () => {
      console.log("Remove item mutation settled.");
    },
  });
}
