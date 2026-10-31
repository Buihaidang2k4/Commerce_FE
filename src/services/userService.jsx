import { USER_API } from '../constants/apiPathConstants';
import apiBase from "./apiBase";



const userService = {
    getAll: () =>
        apiBase.get(USER_API.ALL),

    getUsersById: (userId) =>
        apiBase.get(USER_API.GET_BY_ID(userId)),

    getMyInfo: () =>
        apiBase.get(USER_API.MY_INFO),

    createUser: (data) =>
        apiBase.post(USER_API.CREATE, data, { withCredentials: false }),

    updateUser: (userId, data) =>
        apiBase.put(USER_API.UPDATE(userId), data),

    changePassword: (userId, data) =>
        apiBase.put(USER_API.CHANGE_PASSWORD(userId), data),

    deleteUser: (userId) =>
        apiBase.delete(USER_API.DELETE(userId)),
};

export default userService;

export async function fetchCurrentUser() {
    const res = await userService.getMyInfo();
    return res.data.data;
}