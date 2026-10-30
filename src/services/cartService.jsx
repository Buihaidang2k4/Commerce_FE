import apiBase from "./apiBase";

// Định nghĩa endpoint dạng hàm
const CART_API = {
    GET_BY_PROFILE: (profileId) => `/carts/cart/user-profile/${profileId}`,
    CLEAR: (cartId) => `/carts/cart/${cartId}/clear`,
};

const cartService = {
    getCartByProfileId: (profileId) =>
        apiBase.get(CART_API.GET_BY_PROFILE(profileId)),

    clearCart: (cartId) =>
        apiBase.get(CART_API.CLEAR(cartId)),
};

export default cartService;