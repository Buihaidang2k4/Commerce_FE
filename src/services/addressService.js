import apiBase from "./apiBase";

// Định nghĩa endpoint dạng hàm (giống cartItemService)
const ADDRESS = {
    ALL: '/address/all',
    GET_BY_ID: (addressId) => `/address/${addressId}`,
    GET_BY_PROFILE: (profileId) => `/address/profile/${profileId}`,
    UPDATE: '/address/update',
    CREATE: (profileId) => `/address/user-profile/${profileId}/add`,
    DELETE: '/address/delete',
};

const addressService = {
    getAll: () => apiBase.get(ADDRESS.ALL),

    getAddressById: (addressId) =>
        apiBase.get(ADDRESS.GET_BY_ID(addressId)),

    getAddressByProfileId: (profileId) =>
        apiBase.get(ADDRESS.GET_BY_PROFILE(profileId)),

    updateAddress: ({ profileId, addressId, data }) =>
        apiBase.put(
            ADDRESS.UPDATE,
            data,
            { params: { profileId, addressId } }
        ),

    createAddress: ({ profileId, data }) =>
        apiBase.post(
            ADDRESS.CREATE(profileId),
            data
        ),

    deleteAddress: ({ profileId, addressId }) =>
        apiBase.delete(
            ADDRESS.DELETE,
            { params: { profileId, addressId } }
        ),
};

export default addressService;