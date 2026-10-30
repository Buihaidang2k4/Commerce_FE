const voucherTypes = {
    FIXED: 'FIXED_AMOUNT',
    PERCENT: 'PERCENTAGE',
};

export function calculateOrderPrice({
    items = [],
    voucher = null,
    shippingFee = 30000,
}) {
    const subtotal = items.reduce(
        (sum, item) => sum + item.totalPrice,
        0
    );

    let discount = 0;

    if (voucher) {
        if (voucher.minOrderValue <= subtotal) {
            if (voucher.discountType === voucherTypes.FIXED) {
                discount = voucher.discountAmount;
            }

            if (voucher.discountType === voucherTypes.PERCENT) {
                discount = (subtotal * voucher.discountPercent) / 100;
                if (voucher.maxDiscountAmount) {
                    discount = Math.min(discount, voucher.maxDiscountAmount);
                }
            }
            if (discount <= voucher.maxDiscountAmount)
                discount = Math.min(discount, subtotal);
        }

    }

    let total = subtotal - discount + shippingFee;
    if (total < 0) total = 0;

    return {
        subtotal,
        discount,
        shippingFee,
        total,
    };
}
