import useGetCoupon from '../../hooks/coupon/useGetCoupons'
import Loading from "@/utils/Loading";
import { Frown } from 'lucide-react';


const formatCurrency = (value) => {
  if (value === null || value === undefined) return "0 VNĐ";
  return new Intl.NumberFormat('vi-VN', { 
      style: 'decimal', 
      minimumFractionDigits: 0 
  }).format(value) + ' đ'; 
};

const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN", { day: 'numeric', month: 'numeric', year: 'numeric' });
};

const formatDiscountValue = (type, amount, percent) => {
    if (type === "FIXED_AMOUNT" && amount !== null) {
        return {
            value: formatCurrency(amount),
            typeLabel: "(Giảm cố định)"
        };
    }
    if (type === "PERCENTAGE" && percent !== null) {
        return {
            value: `${percent}%`,
            typeLabel: "(Giảm theo %)"
        };
    }
    return {
        value: "N/A",
        typeLabel: ""
    };
};

const STATUS_COLOR_MAP = {
    true: "bg-green-100 text-green-700 border border-green-300",
    false: "bg-red-100 text-red-700 border border-red-300",
    expired: "bg-gray-100 text-gray-500 border border-gray-300", 
};


export default function Manage_membership_levels_and_benefits() {
  const { data: couponResponse, isLoading } = useGetCoupon();

  const coupons = Array.isArray(couponResponse) ? couponResponse : (couponResponse?.data?.data || []);

  if (isLoading) {
    return <Loading />;
  }

  const processedCoupons = coupons.map(coupon => {
    const isExpired = new Date(coupon.expiryDate) < new Date();
    const discountInfo = formatDiscountValue(coupon.discountType, coupon.discountAmount, coupon.discountPercent);

    let statusText = "Đang áp dụng";
    let statusColor = STATUS_COLOR_MAP.true;
    let expiryDateColor = 'inherit';

    if (isExpired) {
        statusText = "Đã hết hạn";
        statusColor = STATUS_COLOR_MAP.expired;
        expiryDateColor = 'rgb(220, 38, 38)'; 
    } else if (!coupon.enabled) {
        statusText = "Đã vô hiệu";
        statusColor = STATUS_COLOR_MAP.false;
    }
    
    return {
      ...coupon,
      discountInfo,
      formattedStartDate: formatDate(coupon.startDate),
      formattedExpiryDate: formatDate(coupon.expiryDate),
      statusText,
      statusColor,
      expiryDateColor,
    };
  });

  
  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
            
            {/* Tiêu đề */}
            <h1 className="text-3xl font-extrabold text-gray-900">
                Quản lý Mã giảm giá <span className='text-blue-600'>Người dùng</span>
            </h1>

            {/* CARD bao bọc BẢNG */}
            <div className="bg-white rounded-xl shadow-lg border border-gray-100">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        {/* TIÊU ĐỀ BẢNG (THEAD) */}
                        <thead className="bg-blue-50/50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/4">
                                    Mã giảm giá
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                                    Loại/Giá trị
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                                    Đơn tối thiểu
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                                    Ngày bắt đầu
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/6">
                                    Ngày hết hạn
                                </th>
                                <th scope="col" className="px-6 py-3 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider w-1/12">
                                    Trạng thái
                                </th>
                            </tr>
                        </thead>
                        
                        <tbody className="bg-white divide-y divide-gray-200">
                            {processedCoupons.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="px-6 py-12 whitespace-nowrap text-md font-medium text-gray-500 text-center">
                                        <Frown size={24} className="mx-auto mb-2" />
                                        Hiện tại bạn chưa có mã giảm giá nào.
                                    </td>
                                </tr>
                            ) : (
                                processedCoupons.map((coupon) => (
                                    <tr key={coupon.couponId} className="hover:bg-gray-50 transition duration-100">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                                            {coupon.code}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            <div className="font-bold">{coupon.discountInfo.value}</div>
                                            <div className="text-gray-500 text-xs">{coupon.discountInfo.typeLabel}</div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {formatCurrency(coupon.minOrderValue)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                            {coupon.formattedStartDate}
                                        </td>
                                        <td 
                                            className="px-6 py-4 whitespace-nowrap text-sm font-medium" 
                                            style={{color: coupon.expiryDateColor}}
                                        >
                                            {coupon.formattedExpiryDate}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-center">
                                            <span
                                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${coupon.statusColor}`}
                                            >
                                                {coupon.statusText}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}