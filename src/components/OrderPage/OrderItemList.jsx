import OrderItemRow from "./OrderItemRow";


export default function OrderItemList({ items }) {
  if (!items.length) return null;

  return (
    <section className="overflow-y-auto">
      {items.map(item => (
        <OrderItemRow key={item.productId} item={item} />
      ))}
    </section>
  );
}
