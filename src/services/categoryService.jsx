import { CATEGORY_API } from '../constants/apiPathConstants';
import apiBase from "./apiBase";



const categoryService = {
    getAllCategories: () => apiBase.get(CATEGORY_API.ALL),

    getCategoryById: (categoryId) =>
        apiBase.get(CATEGORY_API.GET_BY_ID(categoryId)),

    getCategoryName: (categoryName) =>
        apiBase.get(CATEGORY_API.GET_BY_NAME(categoryName)),

    createCategory: (data) =>
        apiBase.post(CATEGORY_API.CREATE, data),

    updateCategory: (categoryId, data) =>
        apiBase.put(CATEGORY_API.UPDATE(categoryId), data),

    deleteCategory: (categoryId) =>
        apiBase.delete(CATEGORY_API.DELETE(categoryId)),
};

export default categoryService;