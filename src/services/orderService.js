import { ORDER_API } from '../constants/apiPathConstants';
import apiBase from "./apiBase";



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