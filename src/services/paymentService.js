import apiBase from "./apiBase";

const paymentService = {
    getPaymentByOrderId: (orderId) => apiBase.get(`/payment/order/${orderId}`),
};

export default paymentService;