import { IMAGE_API } from '../constants/apiPathConstants';
import apiBase from "./apiBase";

const blobConfig = { responseType: "blob" };

// Định nghĩa endpoint dạng hàm (có tham số động)


const imageService = {
  getImagesByProductId: (productId) =>
    apiBase.get(IMAGE_API.GET_BY_PRODUCT(productId)),

  getImageById: (id) =>
    apiBase.get(IMAGE_API.GET_BY_ID(id), blobConfig),
};

export default imageService;