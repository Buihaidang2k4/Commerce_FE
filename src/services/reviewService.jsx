import apiBase from "./apiBase";

const REVIEW_API = {
    GET_BY_PRODUCT: (productId) => `/reviews/product/${productId}`,
    CREATE: '/reviews/create-review',
};

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