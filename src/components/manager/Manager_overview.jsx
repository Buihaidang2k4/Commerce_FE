
export default function Manager_overview() {
  return (
    <div className="flex flex-col gap-6">
      {/* Đơn hàng gần đây */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Đơn hàng gần đây</h2>
        <div className="text-sm text-gray-500">
          Bạn chưa có đơn hàng nào gần đây.
        </div>
      </section>

      {/* Phiếu giảm giá */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Ưu đãi của bạn</h2>
        <div className="text-sm text-gray-500">
          Bạn chưa có ưu đãi nào dành riêng cho bạn.
        </div>
      </section>

      {/* Sản phẩm yêu thích */}
      <section className="bg-white rounded-2xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Sản phẩm yêu thích</h2>
        <div className="text-sm text-gray-500">
          Bạn chưa có sản phẩm nào yêu thích.
        </div>
      </section>
    </div>

  )
}
