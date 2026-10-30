import apiBase from "./apiBase";

const ORDER_API = {
    GET_ORDERS: '/orders/status-page',
    GET_BY_ID: (orderId) => `/orders/order/${orderId}`,
    PLACE_FROM_ITEMS: '/orders/from-cart-items',
    PLACE_BUY_NOW: '/orders/buy-now',
    CANCEL: (orderId) => `/orders/order/${orderId}/cancelOrder`,
};

const orderSevice = {
    getOrders: ({ orderStatus, page, size, sortBy, direction }) =>
        apiBase.get(ORDER_API.GET_ORDERS, { params: { orderStatus, page, size, sortBy, direction } }),

    getOrderById: (orderId) =>
        apiBase.get(ORDER_API.GET_BY_ID(orderId)),

    placeOrderFromItems: ({ data }) =>
        apiBase.post(ORDER_API.PLACE_FROM_ITEMS, data),

    placeOrderBuyNow: ({ data }) =>
        apiBase.post(ORDER_API.PLACE_BUY_NOW, data),

    cancelOrder: (orderId) =>
        apiBase.put(ORDER_API.CANCEL(orderId)),
};

export default orderSevice;