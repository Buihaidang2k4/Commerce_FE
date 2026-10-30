import { DollarSign, CreditCard } from 'lucide-react'; 

export const PAYMENT_METHODS = {
  CASH: {
    value: "CASH",
    label: "Thanh toán khi nhận hàng (CASH/COD)",
    icon: DollarSign,
  },
  VNPAY: {
    value: "VNPAY",
    label: "Thanh toán qua VNPAY",
    icon: CreditCard,
  },
};

export default function PaymentMethod({ selectedPayment: selectedPaymentMethod, setSelectedPayment: setSelectedPaymentMethod }) {

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Phương thức thanh toán</h2>

      {/* Lựa chọn phương thức */}
      <div className="flex flex-col gap-2">
        {Object.values(PAYMENT_METHODS).map((method) => {
          const Icon = method.icon;
          return (
            <label key={method.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="paymentMethod"
                value={method.value}
                checked={selectedPaymentMethod === method.value}
                onChange={() => setSelectedPaymentMethod(method.value)}
              />
              <Icon className="w-5 h-5" />
              <span>{method.label}</span>
            </label>
          );
        })}
      </div>

      {/* Lưu ý */}
      <div className="mt-4 p-3 text-sm rounded bg-yellow-50 text-yellow-800">
        {selectedPaymentMethod === PAYMENT_METHODS.CASH.value ? (
          <p><strong>Lưu ý:</strong> Thanh toán tiền mặt khi nhận hàng.</p>
        ) : (
          <p><strong>Lưu ý:</strong> Bạn sẽ được chuyển hướng đến VNPAY để thanh toán.</p>
        )}
      </div>
    </div>
  );
}
