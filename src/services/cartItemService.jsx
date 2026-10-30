import apiBase from "./apiBase";

const CART_ITEM_API = {
    GET_BY_CART_AND_ITEM: (cartId, cartItemId) =>
        `/cartItems/cart/${cartId}/cartItem/${cartItemId}`,

    GET_BY_IDS: (profileId) => `/cartItems/${profileId}/ids`,

    ADD_ITEM: '/cartItems/cartItem/addItemToCart',

    UPDATE_QUANTITY: (cartId, cartItemId, quantity) =>
        `/cartItems/cart/${cartId}/cartItem/${cartItemId}/updateItemQuantity/${quantity}`,

    REMOVE_ITEM: (cartId, cartItemId) =>
        `/cartItems/cart/${cartId}/cartItem/${cartItemId}/removeItemFromCart`,
};

const cartItemService = {
    getCartItems: (cartId, cartItemId) =>
        apiBase.get(CART_ITEM_API.GET_BY_CART_AND_ITEM(cartId, cartItemId)),

    getCartItemsByIds: ({ profileId, params }) =>
        apiBase.get(CART_ITEM_API.GET_BY_IDS(profileId), { params }),

    addItemToCart: ({ cartId, productId, quantity }) =>
        apiBase.post(
            CART_ITEM_API.ADD_ITEM,
            null,
            { params: { cartId, productId, quantity } }
        ),

    updateItemQuantity: (cartId, cartItemId, quantity) =>
        apiBase.put(CART_ITEM_API.UPDATE_QUANTITY(cartId, cartItemId, quantity)),

    removeItemFromCart: ({ cartId, cartItemId }) =>
        apiBase.delete(CART_ITEM_API.REMOVE_ITEM(cartId, cartItemId)),
};

export default cartItemService;