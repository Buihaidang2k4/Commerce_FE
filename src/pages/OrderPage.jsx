import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ORDER_MODE_FROM_CART, ORDER_MODE_FROM_SINGLE } from "../utils/Constant";
import useGetCoupons from "../hooks/coupon/useGetCoupons";
import Loading from "../utils/Loading";
import Error from "../utils/Error";
import VoucherDialog from "../components/OrderPage/VoucherDialog";
import useUserInfor from "../hooks/user/useUserInfor";
import { formatCurrency } from "../components/product-details/sample/FomartProduct";
import GetAddressDefault from "../components/OrderPage/GetAddressDefault";
import ListAddressDialog from "@/components/OrderPage/ListAddressDialog";
import useGetAddressByProfileId from "../hooks/address/useGetAddressByProfileId";
import PaymentMethod, { PAYMENT_METHODS } from "../components/OrderPage/PaymentMethod";
import useGetItemByIds from "../hooks/cart-item/useGetItemByIds";
import OrderItemList from "../components/OrderPage/OrderItemList";
import { calculateOrderPrice } from "../components/OrderPage/logic/orderPricingFromCart";
import OrderSummary from "../components/OrderPage/OrderSummary";
import { calculateOrderPriceBuyNow } from "../components/OrderPage/logic/orderPricingFromBuyNow";
import useOrderStore from "@/stores/useOrderStore";
import { TicketPercent } from "lucide-react";
import usePlaceOrderCommon from "../components/OrderPage/logic/orderPlaceCommon";

export default function OrderPage() {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [orderParamsBuyFromCart, setOrderParamsBuyFromCart] = useState({});
    const [orderParamsBuyNow, setOrderParamsBuyNow] = useState({});
    const {
        selectedVoucher, selectedAddress, selectedPayment, orderNote,
        setSelectedVoucher, setSelectedAddress, setSelectedPayment, setOrderNote,
        clearOrder,
    } = useOrderStore();

    // gán dữ liệu theo từng trường hợp mua từ giỏ hàng hay trực tiếp từ sản phẩm 
    useEffect(() => {
        switch (state?.mode) {
            case ORDER_MODE_FROM_SINGLE: {
                const buyNowData = {
                    product: state?.product,
                    productName: state?.product?.productName ?? "Không có tên",
                    description: state?.product?.description ?? "Không có mô tả",
                    category: state?.product?.category?.categoryName ?? "Không có danh mục",
                    price: state?.product?.specialPrice ?? state?.product?.price ?? 0,
                    quantity: state?.quantity ?? 1,
                    image: state?.images[0] ?? "",
                };
                setOrderParamsBuyNow(buyNowData);
                break;
            }

            case ORDER_MODE_FROM_CART: {
                const cartData = {
                    profileId: state?.profileId ?? "N/A",
                    items: state?.itemIds ?? [],
                };
                setOrderParamsBuyFromCart(cartData);
                break;
            }

            default:
                console.log("Invalid order mode.");
        }
    }, [state]);

    const { data: vouchers, isError: vouchersError, isLoading: vouchersLoading } = useGetCoupons();
    const [voucherList, setVoucherList] = useState(null);
    const [onShowVoucherDialog, setShowVoucherDialog] = useState(false)

    const { data: user, isError: errorUser, isLoading: loadingUser } = useUserInfor();

    const [showAddressDialog, setShowAddressDialog] = useState(false);
    const { data: addressData } = useGetAddressByProfileId(user?.userProfile?.profileId);
    const [addressList, setAddressList] = useState([]);

    const { data: cartItems, isError: errorItems, isLoading: loadingItems } =
        useGetItemByIds({
            profileId: orderParamsBuyFromCart.profileId,
            params: { ids: orderParamsBuyFromCart.items }
        });
    const { placeOrder } = usePlaceOrderCommon();

    // load danh sach dia chi
    useEffect(() => {
        if (addressData) {
            setAddressList(addressData?.data?.data);
        }
    }, [addressData]);

    // load danh sach ma giam gia
    useEffect(() => {
        if (vouchers) {
            setVoucherList(vouchers);
        }
    }, [vouchers]);

    // address
    const addressDefaultOrSelect = selectedAddress ? selectedAddress : GetAddressDefault(addressList);

    // tính toán giá giỏ hàng 
    const pricing = useMemo(() => {
        return calculateOrderPrice({
            items: cartItems?.data?.data || [],
            voucher: selectedVoucher,
            shippingFee: 30000,
        });
    }, [cartItems, selectedVoucher]);

    // tính toán giá mua ngay
    const pricingBuyNow = useMemo(() => {
        return calculateOrderPriceBuyNow({
            buyNowParams: orderParamsBuyNow,
            voucher: selectedVoucher,
            shippingFee: 30000,
        });
    }, [orderParamsBuyNow, selectedVoucher]);

    const handlePlaceOrder = async () => {
        try {
            const address = selectedAddress || addressDefaultOrSelect;

            const res = await placeOrder({
                mode: state?.mode,
                user,
                selectedAddress: address,
                selectedPayment,
                selectedVoucher,
                orderNote,
                pricing,
                pricingBuyNow,
                orderParamsBuyFromCart,
                orderParamsBuyNow,
            });

            // VNPAY
            if (selectedPayment === 'VNPAY') {
                const paymentUrl = res?.data?.data;

                if (!paymentUrl) {
                    throw new Error("Không lấy được URL thanh toán VNPAY");
                }

                window.location.href = paymentUrl;
                return;
            }

            // COD / tiền mặt
            const orderId = res?.data?.data?.orderId;

            if (!orderId) {
                throw new Error("Không lấy được orderId");
            }

            navigate(`/order-details/${orderId}`);
            clearOrder();
        } catch (err) {
            console.error(err);
        }
    };



    if (vouchersLoading || loadingUser || loadingItems) return <Loading />;
    if (vouchersError || errorUser || errorItems) {
        console.error(vouchersError);
        console.error(errorUser);
        console.error(errorItems);
        return <Error />
    }

    return (
        <>
            {/* header */}
            <div className="w-full flex flex-col items-center mt-6 mb-10">
                <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide">
                    THANH TOÁN SẢN PHẨM
                </h2>
                <div className="flex items-center mt-2 w-full max-w-md">
                    <span className="flex-grow h-px bg-gray-300"></span>
                    <span className="mx-3 text-pink-500">✿</span>
                    <span className="flex-grow h-px bg-gray-300"></span>
                </div>
            </div>

            {/* body */}
            <div className="flex flex-col md:flex-row sm:flex-col gap-5 m-5 ">

                <section className=" flex-7 h-[800px] overflow-y-auto  p-5  ">
                    {/* row Buy Now*/}
                    {state?.mode === ORDER_MODE_FROM_SINGLE && (
                        <div
                            className="p-5 flex flex-row gap-6 bg-white  border-t
                            border-b border-gray-200 hover:shadow-2xl hover:scale-[1.02] 
                            transition-all duration-300 ease-in-out"
                        >
                            {/* Hình ảnh */}
                            <div className="flex-shrink-0">
                                <img
                                    className="w-24 h-24 object-cover rounded-lg border border-gray-300"
                                    alt="Hình ảnh"
                                    src={state?.images?.[0]}
                                />
                            </div>

                            {/* Nội dung */}
                            <div className="flex flex-col justify-between flex-grow">
                                <span className="text-lg font-semibold text-gray-800">
                                    {orderParamsBuyNow.productName}
                                </span>
                                <span className="text-sm text-gray-600">
                                    <em className="text-gray-500">Mô tả: </em>
                                    {orderParamsBuyNow.description}
                                </span>

                                <div className="flex flex-row justify-between items-center mt-3">
                                    <span className="text-base font-medium text-green-600">
                                        {formatCurrency(orderParamsBuyNow.price)}
                                    </span>
                                    <span className="text-sm text-gray-700">
                                        SL: {orderParamsBuyNow.quantity}
                                    </span>
                                    <span className="text-base font-bold text-red-600">
                                        {formatCurrency(orderParamsBuyNow.price * orderParamsBuyNow.quantity)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    {/* List Item khi mua từ giỏ hàng */}
                    {state?.mode === ORDER_MODE_FROM_CART && <OrderItemList items={cartItems?.data?.data || []} />}
                </section>

                {/* phần bên phải */}
                <section className="flex-4 rounded-md flex flex-col gap-6 p-6 bg-white shadow-md">
                    {/* Ghi chú */}
                    <div className="p-5 space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Ghi chú mua hàng
                        </label>

                        <textarea
                            name="note"
                            rows={3}
                            value={orderNote}
                            onChange={(e) => setOrderNote(e.target.value)}
                            placeholder="Ví dụ: gọi trước khi giao, giao giờ hành chính, để hàng cho bảo vệ..."
                            className="
                        w-full px-4 py-3
                        border border-gray-300 rounded-lg
                        text-sm
                        resize-none
                        focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400
                        transition
        "
                        />
                    </div>


                    {/* Mã giảm giá */}
                    <div className=" p-5 space-y-3">
                        {onShowVoucherDialog &&
                            <VoucherDialog
                                totalAmountOrder={state?.mode === ORDER_MODE_FROM_CART ? pricing.subtotal : pricingBuyNow.subtotal}
                                vouchers={voucherList}
                                onClose={() => (setShowVoucherDialog(false))}
                                onSelect={(voucher) => {
                                    setSelectedVoucher(voucher);
                                    setShowVoucherDialog(false)
                                }} />
                        }
                        <button
                            onClick={() => setShowVoucherDialog(true)}
                            className=" w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition
                        "
                        >
                            <TicketPercent size={20} />
                            <span className="text-sm font-medium">
                                {selectedVoucher ? selectedVoucher.code : "Chọn mã giảm giá"}
                            </span>
                        </button>

                    </div>

                    {/* Địa chỉ */}
                    <div className="p-5 border rounded-lg bg-white  relative">
                        <label className="block text-gray-700 font-semibold text-sm mb-2">
                            Địa chỉ giao hàng <span className="border-2 text-[10px] border-amber-500 h-2 w-5 px-3 border-solid text-[red]">Mặc định </span>
                        </label>
                        <div className="space-y-1 text-sm text-gray-700">
                            {addressDefaultOrSelect && (
                                <>
                                    <p className="font-medium">{addressDefaultOrSelect.fullAddress}</p>
                                    <p>{addressDefaultOrSelect.shortAddress}</p>

                                    {addressDefaultOrSelect.additionalInfo && (
                                        <p className="text-gray-500 italic">
                                            {addressDefaultOrSelect.additionalInfo}
                                        </p>
                                    )}
                                </>
                            )}
                        </div>

                        {/* Nút chọn địa chỉ khác */}
                        <div className="mt-4">
                            <button
                                onClick={() => setShowAddressDialog(true)}
                                className="  text-blue-500 hover:scale-105 text-sm font-medium cursor-pointer"
                            >
                                Chọn địa chỉ khác
                            </button>
                        </div>
                        {/* show list Address */}
                        {showAddressDialog &&
                            <ListAddressDialog
                                addresses={addressList}
                                selectedAddress={selectedAddress}
                                open={showAddressDialog}
                                onClose={() => (setShowAddressDialog(false))}
                                onSelect={(address) => {
                                    setSelectedAddress(address);
                                    setShowAddressDialog(false)
                                }}
                            />
                        }
                    </div>

                    {/* Phương thức thanh toán  */}
                    <PaymentMethod selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} />


                    {/* Thanh toán */}
                    <div className=" p-5 space-y-2">
                        {state?.mode === ORDER_MODE_FROM_SINGLE && (
                            <OrderSummary
                                subtotal={pricingBuyNow.subtotal}
                                discount={pricingBuyNow.discount}
                                shippingFee={pricingBuyNow.shippingFee}
                                total={pricingBuyNow.total}
                            />
                        )
                        }


                        {state?.mode === ORDER_MODE_FROM_CART && (
                            <OrderSummary
                                subtotal={pricing.subtotal}
                                discount={pricing.discount}
                                shippingFee={pricing.shippingFee}
                                total={pricing.total}
                            />
                        )
                        }
                        <button
                            onClick={handlePlaceOrder}
                            className="w-full mt-4 bg-red-500 text-white font-semibold py-3 rounded-md 
                            shadow hover:bg-red-600 transition duration-200"
                        >
                            Đặt hàng
                        </button>
                    </div>
                </section>
            </div>
        </>
    );
}