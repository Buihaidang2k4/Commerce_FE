import { formatCurrency } from "../product-details/sample/FomartProduct";

export default function OrderSummary({
  subtotal,
  discount,
  shippingFee,
  total,
}) {
  return (
    <div className="space-y-2">
      <Row label="Tổng tiền hàng" value={subtotal} />
      <Row label="Phí vận chuyển" value={shippingFee} />
      <Row label="Giảm giá" value={-discount} highlight />
      <Row label="Tổng thanh toán" value={total} bold />
    </div>
  );
}

function Row({ label, value, bold, highlight }) {
  return (
    <div className="flex justify-between">
      <span className={bold ? 'font-bold' : ''}>{label}</span>
      <span
        className={[
          bold && 'font-bold',
          highlight && 'text-green-600',
        ].join(' ')}
      >
        {formatCurrency(value)}
      </span>
    </div>
  );
}
