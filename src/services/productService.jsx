import apiBase from "./apiBase";

// Định nghĩa endpoint dạng hằng số (hàm nếu có tham số động)
const PRODUCT_API = {
  SEARCH: '/products/search',
  ALL: '/products/all',
  PAGE: '/products/page',
  BY_CATEGORY: '/products/category/by-category-name',
  GET_BY_ID: (productId) => `/products/product/${productId}`,
  CREATE: '/products/add',
  UPDATE: (productId) => `/products/${productId}`,
  DELETE: (productId) => `/products/${productId}`,
};

const productService = {
  searchByUsers: (params) =>
    apiBase.get(PRODUCT_API.SEARCH, { params }),

  getAllProducts: () =>
    apiBase.get(PRODUCT_API.ALL),

  getAllProductsByPage: (page, size, sortBy, direction) =>
    apiBase.get(PRODUCT_API.PAGE, { params: { page, size, sortBy, direction } }),

  getProductByCategoryName: (categoryName, page, size, sortBy, direction) =>
    apiBase.get(
      PRODUCT_API.BY_CATEGORY,
      { params: { categoryName, page, size, sortBy, direction } }
    ),

  getProductById: (productId) =>
    apiBase.get(PRODUCT_API.GET_BY_ID(productId)),

  createProduct: (data) =>
    apiBase.post(PRODUCT_API.CREATE, data),

  updateProduct: (productId, data) =>
    apiBase.put(PRODUCT_API.UPDATE(productId), data),

  deleteProduct: (productId) =>
    apiBase.delete(PRODUCT_API.DELETE(productId)),
};

export default productService;