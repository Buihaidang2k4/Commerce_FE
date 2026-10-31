import { COUPON_API } from '../constants/apiPathConstants';
import apiBase from "./apiBase";



const couponService = {
    getCoupons: () => apiBase.get(COUPON_API.GET_AVAILABLE),

    createCoupon: ({ data }) => apiBase.get(COUPON_API.CREATE, data),
};

export default couponService;