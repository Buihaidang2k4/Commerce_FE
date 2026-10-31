import { PROFILE_API } from '../constants/apiPathConstants';
import apiBase from "./apiBase";



const userService = {
    getAll: () =>
        apiBase.get(PROFILE_API.ALL),

    getUsersById: (profileId) =>
        apiBase.get(PROFILE_API.GET_BY_ID(profileId)),

    createOrUpdateProfile: (userId, data) =>
        apiBase.post(PROFILE_API.CREATE_OR_UPDATE(userId), data),
};

export default userService;