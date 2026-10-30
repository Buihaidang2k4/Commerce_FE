import { useState } from "react"
import ReactPaginate from "react-paginate"
import { Eye } from "lucide-react"

import { ORDER_STATUS } from "../../utils/Constant"
import useGetOrdersByStatus from "../../hooks/order/useGetOrdersByStatus"
import Loading from "../../utils/Loading"
import formatCurrency from "../OrderPage/logic/FormatCurrency"
import ProductImage from "../product-list/ProductImageUrl"
import useCancelOrder from "../../hooks/order/useCancelOrder"
import { useNavigate } from "react-router-dom"

/*  CONSTANT  */

const STATUS_LABEL = {
  PENDING: "Chờ xử lý",
  SHIPPED: "Đang giao hàng",
  DELIVERED: "Đã giao thành công",
  CANCELLED: "Đã huỷ",
}

const STATUS_COLOR = {
  PENDING: "bg-yellow-100 text-yellow-700",
  SHIPPED: "bg-blue-100 text-blue-700",
  DELIVERED: "bg-green-100 text-green-700",
  CANCELLED: "bg-red-100 text-red-700",
}

/*  COMPONENT  */
export default function ManagePurchaseHistory() {
const navigate = useNavigate();
  const [status, setStatus] = useState(ORDER_STATUS.PENDING)
  const [page, setPage] = useState(0)

  const size = 4

  const { data: order, isLoading } = useGetOrdersByStatus({
    orderStatus: status,
    page,
    size,
    sortBy: "orderDate",
    direction: "desc",
  })
  const { mutateAsync: cancelOrder } = useCancelOrder();

  const pageData = order?.data?.data

  const handleChangeStatus = (value) => {
    setStatus(value)
    setPage(0)
  }

  const handleCancelOrder = async (orderId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn hủy đơn hàng này không?");
    if (!confirmed) return;

    cancelOrder({ orderId });
  };

  const handleClickDetailOrder = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };



  if (isLoading) return <Loading />

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-4">
      {/*STATUS TABS */}
      <div className="flex gap-2 border-b">
        {Object.values(ORDER_STATUS).map((value) => (
          <button
            key={value}
            onClick={() => handleChangeStatus(value)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition
              ${status === value
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-500"
              }`}
          >
            {STATUS_LABEL[value]}
          </button>
        ))}
      </div>

      {/*  EMPTY STATE  */}
      {pageData?.content?.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          Không có đơn hàng
        </div>
      )}

      {/*  ORDER LIST  */}
      <div className="space-y-4">
        {pageData?.content?.map((item) => (
          <div
            key={item.orderId}
            className="border rounded-lg bg-white shadow-sm"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center px-4 py-3 border-b">
              <div>
                <p className="text-sm font-medium">
                  Mã đơn: <span className="text-blue-600">#{item.orderId}</span>
                </p>
                <p className="text-xs text-gray-500">
                  Ngày đặt: <strong className="text-black">{item.orderDate}</strong>
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${STATUS_COLOR[item.orderStatus]}`}
              >
                {STATUS_LABEL[item.orderStatus]}
              </span>
            </div>

            {/* BODY */}
            <div className="px-4 py-3 space-y-3 text-sm text-gray-700">
              {/* PRODUCT LIST */}
              <div className="space-y-3">
                {item.orderItemResponses.map((item) => (
                  <div
                    key={item.orderItemId}
                    className="flex gap-3 items-start"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded border flex items-center justify-center text-xs text-gray-400">
                      <ProductImage productId={item.productId} />
                    </div>

                    <div className="flex-1">
                      <p className="font-medium line-clamp-2">
                        {item.productName}
                      </p>

                      <div className="flex justify-between mt-1 text-gray-500">
                        <span>
                          {formatCurrency(item.price)} × {item.quantity}
                        </span>
                        <span className="text-gray-700 font-medium">
                          {formatCurrency(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* TOTAL */}
              <div className="border-t pt-3 space-y-1">
                <div className="flex justify-between">
                  <span>Phí vận chuyển</span>
                  <span>{formatCurrency(item.shippingFee)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Giảm giá</span>
                  <span className="text-green-600">
                    -{formatCurrency(item.discountAmount)}
                  </span>
                </div>

                <div className="flex justify-between font-semibold text-base">
                  <span>Tổng thanh toán</span>
                  <span className="text-red-600">
                    {formatCurrency(item.totalAmount)}
                  </span>
                </div>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex justify-end gap-3 px-4 py-3 border-t">
              {item.orderStatus === ORDER_STATUS.PENDING && (
                <button
                  onClick={() => handleCancelOrder(item.orderId)}
                  className="px-4 py-2 text-sm border rounded hover:bg-gray-100">
                  Huỷ đơn
                </button>
              )}

              <button
                onClick={() => handleClickDetailOrder(item.orderId)}
                className="px-4 py-2 text-sm flex items-center gap-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                <Eye size={16} />
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>

      {/*  PAGINATION  */}
      {pageData?.totalPages > 1 && (
        <>
          <div className="flex justify-center mt-6">
            <ReactPaginate
              previousLabel="‹"
              nextLabel="›"
              breakLabel="..."
              pageCount={pageData.totalPages}
              onPageChange={(e) => setPage(e.selected)}
              forcePage={page}
              pageRangeDisplayed={3}
              marginPagesDisplayed={1}
              containerClassName="flex items-center gap-1"
              pageClassName="px-3 py-1 border rounded text-sm hover:bg-gray-100"
              activeClassName="bg-blue-500 text-white border-blue-500"
              previousClassName="px-3 py-1 border rounded hover:bg-gray-100"
              nextClassName="px-3 py-1 border rounded hover:bg-gray-100"
              disabledClassName="opacity-50 cursor-not-allowed"
            />
          </div>

          <p className="text-center text-sm text-gray-500">
            Trang {pageData.currentPage + 1} / {pageData.totalPages}
          </p>
        </>
      )}
    </div>
  )
}
