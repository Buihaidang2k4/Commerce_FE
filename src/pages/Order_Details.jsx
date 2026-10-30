import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import Loading from "@/utils/Loading";
import formatCurrency from "../components/OrderPage/logic/FormatCurrency";

import useGetOrderDetail from "../hooks/order/useGetOrderById";
import useGetPaymentByOrder from "@/hooks/payment/useGetPaymentByOrderId";
import useGetDeliveryAddressByOrder from "../hooks/delivery_address_order/useGetDeliveryAddressByOrderId";
import ProductImage from "../components/product-list/ProductImageUrl";
import useExportOrderPdf from "../hooks/report/useExportReportPDF";

const ORDER_STATUS_COLOR = {
  PENDING: "bg-yellow-50 text-yellow-800 border border-yellow-200",
  SHIPPED: "bg-blue-50 text-blue-800 border border-blue-200",
  DELIVERED: "bg-green-50 text-green-800 border border-green-200",
  CANCELLED: "bg-red-50 text-red-800 border border-red-200",
};

const PAYMENT_STATUS_COLOR = {
  UNPAID: "bg-red-50 text-red-800 border border-red-200",
  PAID: "bg-green-50 text-green-800 border border-green-200",
  FAILED: "bg-gray-50 text-gray-800 border border-gray-200",
};

const DetailItem = ({ label, value, isPrimary = false }) => (
  <div className="flex justify-between items-start py-2">
    <span className="text-gray-600 font-normal">{label}</span>
    <span className={`text-right ${isPrimary ? 'text-lg font-semibold text-gray-900' : 'text-gray-700'}`}>
      {value}
    </span>
  </div>
);

const StatusBadge = ({ status, colorMap }) => (
  <span
    className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-semibold ${colorMap[status]}`}
  >
    {status}
  </span>
);


export default function Order_Details() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const { data: orderRes, isLoading: orderLoading } = useGetOrderDetail(orderId);
  const { data: paymentRes, isLoading: paymentLoading } = useGetPaymentByOrder(orderId);
  const { data: addressRes, isLoading: addressLoading } = useGetDeliveryAddressByOrder(orderId);
  const { mutateAsync: exportOrderPdf, isPending } = useExportOrderPdf();

  if (orderLoading || paymentLoading || addressLoading) {
    return <Loading />;
  }

  const order = orderRes?.data?.data;
  const payment = paymentRes?.data?.data;
  const address = addressRes?.data?.data;

  const handleViewPdf = async () => {
    try {
      const res = await exportOrderPdf(orderId);

      const blob = new Blob([res.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);

      window.open(url, "_blank");

      setTimeout(() => window.URL.revokeObjectURL(url), 10000);
    } catch (err) {
      console.error(err);
    }
  };


  if (!order || !payment || !address) {
    return (
      <div className="text-center p-8 text-gray-600">
        Không tìm thấy chi tiết đơn hàng hoặc thông tin liên quan.
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 bg-white min-h-screen">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/manager/manage-purchase-history")}
            className="flex items-center gap-1 p-2 rounded border text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
            aria-label="Quay lại"
          >
            <ArrowLeft size={18} />
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            Chi tiết đơn hàng <span className="text-blue-600 font-extrabold">#{order.orderId}</span>
          </h1>
        </div>

        {/* STATUS & DATE BAR */}
        <div className="flex flex-wrap gap-x-6 gap-y-2 items-center text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-600">Trạng thái:</span>
            <StatusBadge status={order.orderStatus} colorMap={ORDER_STATUS_COLOR} />
          </div>

          <div>
            <span className="text-gray-600">Ngày đặt:</span>
            <strong className="ml-1 text-gray-800">{order.orderDate}</strong>
          </div>

          <button
            onClick={handleViewPdf}
            disabled={isPending}
            className="px-4 py-2 border rounded text-sm hover:bg-gray-200 disabled:opacity-50"
          >
            {isPending ? "Đang tạo PDF..." : "Xem hoá đơn (PDF)"}
          </button>


        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* LEFT COLUMN: Product List & Summary (Chiếm 2/3) */}
        <div className="lg:col-span-2 space-y-8">

          {/* PRODUCT LIST */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">Sản phẩm</h2>

            <div className="space-y-4">
              {order.orderItemResponses.map(item => (
                <div
                  key={item.orderItemId}
                  className="flex items-center gap-4 text-sm"
                >
                  <div className="flex-shrink-0 w-16 h-16 bg-gray-100 border border-gray-200 rounded flex items-center justify-center text-xs text-gray-500 font-medium">
                    <ProductImage productId={item?.productId} />
                  </div>

                  <div className="flex-grow">
                    <p className="font-medium text-gray-900">{item.productName}</p>
                    <p className="text-gray-500">
                      {formatCurrency(item.price)} <span className="mx-1">×</span> SL: {item.quantity}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0 font-semibold">
                    {formatCurrency(item.price * item.quantity)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SUMMARY */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">Tổng kết đơn hàng</h2>

            <div className="space-y-2 text-md">
              <DetailItem label="Tổng tiền hàng" value={formatCurrency(order.totalAmount + order.discountAmount - order.shippingFee)} />

              <div className="flex justify-between pt-1">
                <span className="text-gray-600 font-normal">Phí vận chuyển</span>
                <span className="text-gray-700">{formatCurrency(order.shippingFee)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600 font-normal">Giảm giá</span>
                <span className="text-green-600 font-medium">
                  -{formatCurrency(order.discountAmount)}
                </span>
              </div>

              <div className="flex justify-between items-center border-t pt-4 mt-4">
                <span className="text-xl font-bold text-gray-900">Tổng thanh toán</span>
                <span className="text-xl font-extrabold text-red-500">
                  {formatCurrency(order.totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>


        {/* RIGHT COLUMN: Delivery & Payment (Chiếm 1/3) */}
        <div className="lg:col-span-1 space-y-8">

          {/* DELIVERY ADDRESS */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">Địa chỉ giao hàng</h2>

            <div className="space-y-3 text-sm">
              <p className="text-lg font-semibold text-gray-900">
                {address.recipientName}
              </p>

              <div className="text-gray-700">
                <strong className="font-medium mr-1 text-gray-500">SĐT:</strong>
                <span className="text-gray-800 font-semibold">{address.recipientPhone}</span>
              </div>

              <p className="text-md text-gray-600">
                {address.street}, {address.ward}, {address.district}, {address.province}
              </p>

              {address.deliveryNote && (
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-700">
                    <strong className="font-medium text-gray-500">Ghi chú:</strong> {address.deliveryNote}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PAYMENT INFO */}
          <div className="bg-white border border-gray-200 rounded-lg p-5">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-3">Thông tin thanh toán</h2>

            <div className="space-y-2 text-sm">
              <DetailItem label="Phương thức" value={payment.paymentMethod} isPrimary={true} />

              <div className="flex justify-between items-center py-2">
                <span className="text-gray-600 font-normal">Trạng thái</span>
                <StatusBadge status={payment.paymentStatus} colorMap={PAYMENT_STATUS_COLOR} />
              </div>

              <DetailItem
                label="Ngày thanh toán"
                value={
                  payment.paymentDate
                    ? new Date(payment.paymentDate).toLocaleDateString("vi-VN")
                    : "Chưa thanh toán"
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}