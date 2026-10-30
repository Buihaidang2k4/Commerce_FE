import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTruckFast, faShieldHalved,
    faStar
} from "@fortawesome/free-solid-svg-icons";
export const AboutShopSection = () => (
    <div className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-800 mb-4 uppercase">Về Chúng Tôi</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-sm text-gray-600 leading-relaxed">
                <div>
                    <p className="mb-4">
                        <strong>MyStore</strong> là điểm đến hàng đầu cho các tín đồ công nghệ và thời trang. Chúng tôi cam kết mang đến những sản phẩm chính hãng 100% với mức giá cạnh tranh nhất thị trường.
                    </p>
                    <p>
                        Với sứ mệnh "Nâng tầm trải nghiệm mua sắm", chúng tôi không ngừng nỗ lực cải thiện dịch vụ, từ khâu tư vấn, đóng gói đến giao hàng, đảm bảo sự hài lòng tuyệt đối cho khách hàng.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-800 mb-2">Tại sao chọn chúng tôi?</h4>
                    <ul className="space-y-2">
                        <li className="flex items-center justify-center md:justify-start gap-2">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400" /> Uy tín được khẳng định bởi hơn 1 triệu khách hàng.
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-2">
                            <FontAwesomeIcon icon={faShieldHalved} className="text-blue-500" /> Chính sách đổi trả minh bạch, rõ ràng.
                        </li>
                        <li className="flex items-center justify-center md:justify-start gap-2">
                            <FontAwesomeIcon icon={faTruckFast} className="text-green-500" /> Hệ thống kho bãi rộng khắp, giao hàng thần tốc.
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
);