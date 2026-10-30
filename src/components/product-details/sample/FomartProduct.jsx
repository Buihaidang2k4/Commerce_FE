export function formatCurrency(value) {
  if (value == null) return "";
  return value.toLocaleString("vi-VN", {
    style: "currency",
    currency: "VND",
  });
}

// convet soldCount, reviewCount to number
export function convertSoldCount(sold_count) {
  if (sold_count < 1000) {
    return sold_count.toString();
  }
  if (sold_count < 1000000) {
    return Math.floor(sold_count / 1000) + "k";
  }
  return Math.floor(sold_count / 1000000) + "M";
}

export function convertAvgRating(avg_rating) {
        if (!avg_rating) {
            return (
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-semibold">0.0</span>
                    <span className="text-yellow-400">☆☆☆☆☆</span>
                </div>
            );
        }

        const stars = "★★★★★☆☆☆☆☆".slice(5 - avg_rating, 10 - avg_rating);

        return (
            <div className="flex items-center gap-2">
                {/* Số rating hiển thị đậm, có 1 số thập phân */}
                <span className="text-gray-800 font-bold text-lg underline">
                    {avg_rating.toFixed(1)}
                </span>

                {/* Sao hiển thị màu vàng */}
                <span className="text-yellow-400 text-xl">{stars}</span>
            </div>
        );
    }