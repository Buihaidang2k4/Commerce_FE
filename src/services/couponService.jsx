import apiBase from "./apiBase";

const COUPON_API = {
    GET_AVAILABLE: '/coupons/coupon-available',
    CREATE: '/coupons/api/v1/coupons/coupon/create',
};

const couponService = {
    getCoupons: () => apiBase.get(COUPON_API.GET_AVAILABLE),

    createCoupon: ({ data }) => apiBase.get(COUPON_API.CREATE, data),
};

export default couponService;