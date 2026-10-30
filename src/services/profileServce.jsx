import apiBase from "./apiBase";

const USER_API = {
    ALL: '/profiles/all',
    GET_BY_ID: (profileId) => `/profiles/${profileId}`,
    CREATE_OR_UPDATE: (userId) => `/profiles/user/${userId}/createOrUpdateProfile`,
};

const userService = {
    getAll: () =>
        apiBase.get(USER_API.ALL),

    getUsersById: (profileId) =>
        apiBase.get(USER_API.GET_BY_ID(profileId)),

    createOrUpdateProfile: (userId, data) =>
        apiBase.post(USER_API.CREATE_OR_UPDATE(userId), data),
};

export default userService;