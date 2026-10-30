export default function VoucherDialog({ vouchers, onClose, onSelect, totalAmountOrder }) {
  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center bg-gradient-to-br from-black/40 to-gray-700/30 backdrop-blur-sm justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl w-[420px] p-6 space-y-5">
        <h2 className="text-xl font-bold text-gray-800 text-center">
          🎟️ Chọn Voucher
        </h2>

        {/* Danh sách voucher */}
        <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
          {vouchers.map((voucher) => (
            <div
              key={voucher.couponId}
              className="p-4 bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-md border 
                         hover:shadow-lg transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="block font-bold text-blue-600 text-sm">
                    {voucher.code}
                  </span>
                  <span className="text-sm text-gray-600">
                    {voucher.discountType === "FIXED_AMOUNT"
                      ? `Giảm ${voucher.discountAmount.toLocaleString()}đ`
                      : `Giảm ${voucher.discountPercent}%`}
                  </span>
                </div>
                <button
                  disabled={voucher.minOrderValue > totalAmountOrder}
                  onClick={() => onSelect(voucher)}
                  className={`px-3 py-1 text-white text-sm rounded-md transition
                  ${voucher.minOrderValue <= totalAmountOrder
                      ? "bg-blue-500 hover:bg-blue-600 cursor-pointer"
                      : "bg-gray-400 cursor-not-allowed"}`}
                >
                  Áp dụng
                </button>

              </div>

              <div className="text-sm text-gray-700 mt-2">
                Đơn tối thiểu: {voucher.minOrderValue.toLocaleString()}đ
              </div>
              <div className="text-xs text-gray-500 mt-1">
                HSD: {new Date(voucher.expiryDate).toLocaleDateString("vi-VN")}
              </div>
            </div>
          ))}
        </div>

        {/* Nút đóng */}
        <button
          onClick={onClose}
          className="w-full mt-2 bg-gray-300 text-gray-700 py-2 rounded-md 
                     hover:bg-gray-400 transition"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
