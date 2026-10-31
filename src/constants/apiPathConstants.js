export const API_PREFIX = '/api/v1';

export const ADDRESS = Object.freeze({
    ALL: '/address/all',
    GET_BY_ID: (addressId) => `/address/${addressId}`,
    GET_BY_PROFILE: (profileId) => `/address/profile/${profileId}`,
    UPDATE: '/address/update',
    CREATE: (profileId) => `/address/user-profile/${profileId}/add`,
    DELETE: '/address/delete',
});

export const AUTH = Object.freeze({
  LOGIN: '/auth/login',
  REGISTER: '/users/registration',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  LOGOUT: '/auth/logout',
  REFRESH: '/auth/refresh',
  INTROSPECT: '/auth/introspect',
});

export const CART_ITEM_API = Object.freeze({
    GET_BY_CART_AND_ITEM: (cartId, cartItemId) =>
        `/cartItems/cart/${cartId}/cartItem/${cartItemId}`,

    GET_BY_IDS: (profileId) => `/cartItems/${profileId}/ids`,

    ADD_ITEM: '/cartItems/cartItem/addItemToCart',

    UPDATE_QUANTITY: (cartId, cartItemId, quantity) =>
        `/cartItems/cart/${cartId}/cartItem/${cartItemId}/updateItemQuantity/${quantity}`,

    REMOVE_ITEM: (cartId, cartItemId) =>
        `/cartItems/cart/${cartId}/cartItem/${cartItemId}/removeItemFromCart`,
});

export const CART_API = Object.freeze({
    GET_BY_PROFILE: (profileId) => `/carts/cart/user-profile/${profileId}`,
    CLEAR: (cartId) => `/carts/cart/${cartId}/clear`,
});

export const CATEGORY_API = Object.freeze({
    ALL: '/categories/all',
    GET_BY_ID: (categoryId) => `/categories/category/${categoryId}`,
    GET_BY_NAME: (categoryName) => `/categories/category/categoryName/${categoryName}`,
    CREATE: '/categories/category/add',
    UPDATE: (categoryId) => `/categories/category/${categoryId}/update`,
    DELETE: (categoryId) => `/categories/category/${categoryId}/delete`,
});

export const COUPON_API = Object.freeze({
    GET_AVAILABLE: '/coupons/coupon-available',
    CREATE: '/coupons/api/v1/coupons/coupon/create',
});

export const IMAGE_API = Object.freeze({
  GET_BY_PRODUCT: (productId) => `/images/product/${productId}/images`,
  GET_BY_ID: (id) => `/images/image/download/${id}`,
});

export const ORDER_API = Object.freeze({
    GET_ORDERS: '/orders/status-page',
    GET_BY_ID: (orderId) => `/orders/order/${orderId}`,
    PLACE_FROM_ITEMS: '/orders/from-cart-items',
    PLACE_BUY_NOW: '/orders/buy-now',
    CANCEL: (orderId) => `/orders/order/${orderId}/cancelOrder`,
});

export const PRODUCT_API = Object.freeze({
  SEARCH: '/products/search',
  ALL: '/products/all',
  PAGE: '/products/page',
  BY_CATEGORY: '/products/category/by-category-name',
  GET_BY_ID: (productId) => `/products/product/${productId}`,
  CREATE: '/products/add',
  UPDATE: (productId) => `/products/${productId}`,
  DELETE: (productId) => `/products/${productId}`,
});

export const PROFILE_API = Object.freeze({
    ALL: '/profiles/all',
    GET_BY_ID: (profileId) => `/profiles/${profileId}`,
    CREATE_OR_UPDATE: (userId) => `/profiles/user/${userId}/createOrUpdateProfile`,
});

export const REVIEW_API = Object.freeze({
    GET_BY_PRODUCT: (productId) => `/reviews/product/${productId}`,
    CREATE: '/reviews/create-review',
});

export const USER_API = Object.freeze({
    ALL: '/users/all',
    GET_BY_ID: (userId) => `/users/${userId}`,
    MY_INFO: '/users/myInfo',
    CREATE: '/users/registration',
    UPDATE: (userId) => `/users/${userId}/update-role-user`,
    CHANGE_PASSWORD: (userId) => `/users/${userId}/change-password`,
    DELETE: (userId) => `/users/${userId}/delete`,
});
