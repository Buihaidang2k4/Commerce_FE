import { ORDER_MODE_FROM_CART, ORDER_MODE_FROM_SINGLE } from '@/utils/Constant'
import { usePlaceOrderBuyNow } from '@/hooks/order/usePlaceOrderBuyNow'
import usePlaceOrderFromItems from '@/hooks/order/usePlaceOrderFromItems'
export default function usePlaceOrderCommon() {
    const { mutateAsync: placeOrderBuyNow } = usePlaceOrderBuyNow()
    const { mutateAsync: placeOrderFromItems } = usePlaceOrderFromItems()

    const placeOrder = async ({
        mode,
        user,
        selectedAddress,
        selectedPayment,
        selectedVoucher,
        orderNote,
        pricing,
        pricingBuyNow,
        orderParamsBuyFromCart,
        orderParamsBuyNow,
    }) => {
        const profileId = user?.userProfile?.profileId
        const addressId = selectedAddress?.addressId
        const paymentMethod = selectedPayment
        const couponCode = selectedVoucher?.code ?? ''
        const bankCode = 'NCB'
        const note = orderNote ?? ''
        if (mode === ORDER_MODE_FROM_CART) {
            return await placeOrderFromItems({
                profileId,
                listItemId: orderParamsBuyFromCart.items,
                addressId,
                paymentMethod,
                orderNote: note,
                shippingFee: pricing.shippingFee,
                bankCode,
                couponCode,
            })
        }

        if (mode === ORDER_MODE_FROM_SINGLE) {
            return await placeOrderBuyNow({
                profileId,
                productId: orderParamsBuyNow.product.productId,
                quantity: orderParamsBuyNow.quantity,
                addressId,
                paymentMethod,
                orderNote: note,
                shippingFee: pricingBuyNow.shippingFee,
                bankCode,
                couponCode,
            })
        }
    }

    return { placeOrder }
}
