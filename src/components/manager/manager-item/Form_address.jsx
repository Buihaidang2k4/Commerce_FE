import { useState, useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import useUserInfor from "@/hooks/user/useUserInfor";
import axios from "axios";
import { notify } from "../../../utils/notify";
import Loading from "../../../utils/Loading";
import useCreateAddress from "../../../hooks/address/useCreateAddress";
import Error from "../../../utils/Error";
import useUpdateAddress from "@/hooks/address/useUpdateAddress";
import { ADD_ADDRESS_ACTION, UPDATE_ADDRESS_ACTION, TypeAddress } from "../../../utils/Constant";
import useVietnamAddress from "../../../hooks/address/useVietNameseAddress";

export default function Form_address({
    onClose,
    address = null,
    mode = UPDATE_ADDRESS_ACTION
}) {

    const queryClient = useQueryClient();
    const { data: user, isLoading } = useUserInfor();
    const { mutate: createAddress, isError: createAddressError, isLoading: createAddressLoading } = useCreateAddress();
    const { mutate: updateAddress, isError: updateAddressError, isLoading: updateAddressLoading } = useUpdateAddress();
    const {
        provinces,
        districts,
        wards,
        handleProvinceChange,
        handleDistrictChange,
        handleWardChange
    } = useVietnamAddress(mode === UPDATE_ADDRESS_ACTION ? address : null);

    const [formData, setFormData] = useState({
        fullName: "",
        phone: "",
        street: "",
        ward: "",
        district: "",
        province: "",
        postalCode: "",
        additionalInfo: "",
        isDefault: false,
        type: ""
    });


    // load address into form
    useEffect(() => {
        if (mode !== UPDATE_ADDRESS_ACTION || !address) return;

        setFormData({
            fullName: address.fullName || "",
            phone: address.phone || "",
            street: address.street || "",
            ward: address.ward || "",
            district: address.district || "",
            province: address.province || "",
            postalCode: address.postalCode || "",
            additionalInfo: address.additionalInfo || "",
            isDefault: address.isDefault || false,
            type: address.type || ""
        });


    }, [address, mode]);


    /* =======================
         2. LOAD DISTRICT FROM PROVINCE
      ======================== */
    useEffect(() => {
        if (!formData.province || provinces.length === 0) return;
        handleProvinceChange(formData.province);
    }, [formData.province, provinces]);

    /* =======================
       3. LOAD WARD FROM DISTRICT
    ======================== */
    useEffect(() => {
        if (!formData.district || districts.length === 0) return;
        handleDistrictChange(formData.district);
    }, [formData.district, districts]);


    // Handle input change and valid 
    const handleChange = (e) => {
        const { name, value } = e.target;


        if (name === "phone") {
            const regexPhone = /^\d*$/;
            if (regexPhone.test(value)) {
                setFormData({ ...formData, [name]: value });
            }
        }
        else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleTypeAddressChange = (e) => {
        setFormData({ ...formData, type: e.target.value })
    }

    // Click thêm địa chỉ // update 
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            if (mode === ADD_ADDRESS_ACTION) {
                const profileId = user?.userProfile?.profileId;
                if (!profileId) {
                    console.error("profileId null");
                    return;
                }
                createAddress({
                    profileId, data: {
                        ...formData,
                    }
                });
            } else if (mode == UPDATE_ADDRESS_ACTION) {
                const addressId = address?.addressId;
                if (!addressId) {
                    console.error("addressId null")
                    return;
                }
                updateAddress({ addressId, profileId: user?.userProfile?.profileId, data: formData });
            }
            await queryClient.invalidateQueries(["userInfo"]);
            onClose();
        } catch (err) {
            console.error("Lỗi cập nhật:", err);
            notify.error("Cập nhật địa chỉ thất bại !")
        }
    };

    // Loading
    if (isLoading || !user.userProfile || createAddressLoading || updateAddressLoading) return <Loading />;
    if (createAddressError || updateAddressError) {
        return <Error />;
    }
    return (
        <div className="absolute inset-0 z-50 flex">
            {/* Nền mờ */}
            <div
                className="inset-0 backdrop-blur-sm bg-opacity-40 transition-opacity duration-500"
            ></div>

            {/* Sidebar form */}
            <div className="ml-auto w-full max-w-md h-full bg-white  z-50 p-8 overflow-y-auto">
                <h3 className="text-xl font-bold text-gray-800 mb-6 border-b pb-2">
                    {mode === "add" ? "Thêm địa chỉ mới" : "Cập nhật địa chỉ"}
                </h3>

                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                    {/* Họ tên / SĐT */}
                    <div className="flex gap-1">
                        <input
                            type="text"
                            name="fullName"
                            placeholder="Họ và tên"
                            onChange={handleChange}
                            value={formData.fullName}
                            required
                            className="flex-1 border border-gray-300 rounded-lg px-[4px] py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="text"
                            name="phone"
                            placeholder="Số điện thoại"
                            onChange={handleChange}
                            value={formData.phone}
                            required
                            className="flex-1 border border-gray-300 rounded-lg px-[4px] py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Tỉnh/Thành phố */}
                    <select
                        onChange={(e) => handleProvinceChange(e.target.value, setFormData)}
                        value={formData.province}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value={""}>Chọn tỉnh/thành phố</option>
                        {provinces.map((p) => (
                            <option key={p.Id} value={p.Name}>{p.Name}</option>
                        ))}
                    </select>

                    {/* Quận/Huyện */}
                    <select
                        onChange={(e) => handleDistrictChange(e.target.value, setFormData)}
                        value={formData.district}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value={""}>Chọn quận/huyện</option>
                        {districts.map((d) => (
                            <option key={d.Id} value={d.Name}>{d.Name}</option>
                        ))}
                    </select>

                    {/* Phường/Xã */}
                    <select
                        onChange={(e) => handleWardChange(e.target.value, setFormData)}
                        value={formData.ward}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option value={""}>Chọn phường/xã</option>
                        {wards.map((w) => (
                            <option key={w.Id} value={w.Name}>{w.Name}</option>
                        ))}
                    </select>

                    {/* Số nhà / Đường */}
                    <input
                        type="text"
                        name="street"
                        placeholder="Số nhà / Đường"
                        onChange={handleChange}
                        value={formData.street}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Mã bưu chính */}
                    <input
                        type="text"
                        name="postalCode"
                        placeholder="Mã bưu chính (Nếu có)"
                        onChange={handleChange}
                        value={formData.postalCode}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />

                    {/* Loại địa chỉ  */}
                    <select
                        onChange={handleTypeAddressChange}
                        value={formData.type}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                        <option>Chọn Loại địa chỉ </option>
                        {TypeAddress.map((t) => (
                            <option key={t}>{t}</option>
                        ))}

                    </select>

                    {/* Thông tin bổ sung */}
                    <textarea
                        name="additionalInfo"
                        placeholder="Thông tin địa chỉ bổ sung"
                        onChange={handleChange}
                        value={formData.additionalInfo}
                        rows={3}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                    ></textarea>

                    {/* Đặt làm mặc định */}
                    <div className="py-3">
                        <input type="checkbox"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={() => setFormData({ ...formData, isDefault: !formData.isDefault })}
                        ></input>
                        <span className="p-2">Đặt địa chỉ làm mặc định</span>
                    </div>

                    {/* Nút hành động */}
                    <div className="flex justify-between mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
                        >
                            {mode === "add" ? "Thêm địa chỉ mới" : "Cập nhật địa chỉ"}
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
}
