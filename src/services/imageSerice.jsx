import apiBase from "./apiBase";

const blobConfig = { responseType: "blob" };

// Định nghĩa endpoint dạng hàm (có tham số động)
const IMAGE_API = {
  GET_BY_PRODUCT: (productId) => `/images/product/${productId}/images`,
  GET_BY_ID: (id) => `/images/image/download/${id}`,
};

const imageService = {
  getImagesByProductId: (productId) =>
    apiBase.get(IMAGE_API.GET_BY_PRODUCT(productId)),

  getImageById: (id) =>
    apiBase.get(IMAGE_API.GET_BY_ID(id), blobConfig),
};

export default imageService;