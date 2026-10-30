import React, { useState, useEffect } from "react";
import Form_address from "../manager/manager-item/Form_address";
import { ADD_ADDRESS_ACTION, UPDATE_ADDRESS_ACTION } from "../../utils/Constant"
import { SquarePen, Trash2 } from "lucide-react";
import useDeleteAddress from "../../hooks/address/useDeleteAddress";
import useAuthStore from "../../stores/useAuthStore";


export default function ListAddressDialog({
    open,
    onClose,
    addresses = [],
    selectedAddress,
    onSelect
}) {
    const { user } = useAuthStore();
    const [selectedAddressId, setSelectedAddressId] = useState(null);
    const [showFormUpdateAddress, setShowFormUpdateAddress] = useState(false);
    const [showFromAddNewAddress, setShowFromAddNewAddress] = useState(false);
    const [selectedAddressUpdate, setSelectedAddressUpdate] = useState([]);
    const { mutateAsync: deleteAddress } = useDeleteAddress();

    if (!open) return null;
    useEffect(() => {
        if (selectedAddress?.addressId) {
            setSelectedAddressId(selectedAddress.addressId);
        }
    }, [selectedAddress]);
    //  overlay 
    const handleOverlayClick = (e) => {
        if (e.target.id === "overlay") {
            onClose();
        }
    };

    // Hàm mở form cập nhật
    const hanldeClickUpdateAddress = (address) => {
        setSelectedAddressId(address.addressId);
        setShowFormUpdateAddress(true);
        setSelectedAddressUpdate(address);
    }

    // Hàm mở form thêm mới 
    const hanldeClickNewAddress = () => {
        setShowFormUpdateAddress(false);
        setSelectedAddressUpdate([]);
        setShowFromAddNewAddress(true);
    }

    const hanldeDelteAddress = (addressId) => {
        if (addressId === null || addressId === undefined) return;
        deleteAddress({ profileId: user?.userProfile?.profileId, addressId });
    }


    // click xác nhận chọn địa chỉ 
    const handleConfirmAddress = () => {
        const selected = addresses.find(addr => addr.addressId === selectedAddressId);
        if (selected) {
            onSelect(selected);
            onClose();
        } else { alert("Bạn chưa chọn địa chỉ nào"); }
    };


    return (
        <div
            id="overlay"
            onClick={handleOverlayClick}

            className="fixed top-20 bg-opacity-40 flex justify-end inset-0 backdrop-blur-sm z-50">

            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 overflow-y-scroll">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold">Chọn địa chỉ giao hàng</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4">
                    {addresses.map((addr) => (
                        <React.Fragment key={addr.addressId}>
                            <label
                                key={addr.addressId}
                                className="flex items-start space-x-3 border rounded-lg p-3 cursor-pointer hover:bg-gray-50"
                            >
                                <input
                                    type="radio"
                                    name="address"
                                    checked={selectedAddressId === addr.addressId}
                                    onChange={() => setSelectedAddressId(addr.addressId)}
                                    className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded-full"
                                />
                                <div>
                                    <p className="font-medium">
                                        {addr.type + " "}
                                        {addr.isDefault && (
                                            <span className="text-xs text-red-500 border-dotted border p-[2px] font-medium">
                                                Mặc định
                                            </span>
                                        )}
                                    </p>

                                    <p className="text-sm text-gray-600">
                                        {addr.fullAddress}
                                    </p>

                                    {/*  Click cập nhật địa chỉ  */}
                                    <div className="flex gap-3">
                                        <div
                                            onClick={() => hanldeClickUpdateAddress(addr)}
                                            className="py-2 text-sm cursor-pointer text-blue-600 hover:underline">
                                            <SquarePen size={18} strokeWidth={1.75} />
                                        </div>
                                        <div
                                            onClick={() => hanldeDelteAddress(addr.addressId)}
                                            className="py-2 text-sm cursor-pointer text-red-700 hover:underline">
                                            <Trash2 size={18} strokeWidth={1.75} />
                                        </div>
                                    </div>
                                </div>

                            </label>

                        </React.Fragment>
                    ))}
                    {/* show form update */}
                    {showFormUpdateAddress &&
                        <Form_address
                            mode={UPDATE_ADDRESS_ACTION}
                            address={selectedAddressUpdate}
                            onClose={() => setShowFormUpdateAddress(false)}
                        />
                    }

                    {/* show form add new address */}
                    {showFromAddNewAddress &&
                        <Form_address
                            mode={ADD_ADDRESS_ACTION}
                            address={null}
                            onClose={() => setShowFromAddNewAddress(false)}
                        />
                    }
                </div>

                <div className="mt-6 flex justify-between">
                    <button
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
                        onClick={() => hanldeClickNewAddress()}
                    >
                        + Thêm địa chỉ mới
                    </button>
                    <button
                        onClick={() => handleConfirmAddress()}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Xác nhận địa chỉ
                    </button>
                </div>

            </div>

        </div>
    );
}
