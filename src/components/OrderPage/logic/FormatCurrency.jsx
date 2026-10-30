
export default function formatCurrency(value) {
    if (value == null) return "";
    return value.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
}
