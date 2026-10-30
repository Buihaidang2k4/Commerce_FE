import apiBase from "./apiBase";

const addressOrderService = {
    getDeliveryAddressByOrderId: (orderId) => apiBase.get(`/delivery-address/order/${orderId}`),
};

export default addressOrderService;

