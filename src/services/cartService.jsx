import { CART_API } from '../constants/apiPathConstants';
import apiBase from "./apiBase";

// Định nghĩa endpoint dạng hàm


const cartService = {
    getCartByProfileId: (profileId) =>
        apiBase.get(CART_API.GET_BY_PROFILE(profileId)),

    clearCart: (cartId) =>
        apiBase.get(CART_API.CLEAR(cartId)),
};

export default cartService;