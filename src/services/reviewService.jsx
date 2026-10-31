import { REVIEW_API } from '../constants/apiPathConstants';
import apiBase from "./apiBase";



const reviewService = {
    getReviewsByProductId: (productId, { page, size, sortBy, direction }) =>
        apiBase.get(REVIEW_API.GET_BY_PRODUCT(productId), { params: { page, size, sortBy, direction } }),

    createProduct: (data, { profileId, orderId, productId }) =>
        apiBase.post(
            REVIEW_API.CREATE,
            data,
            { params: { productId, orderId, profileId } }
        ),
};

export default reviewService;