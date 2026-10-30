import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
     faTruckFast, faShieldHalved,
    faHeadset, faGift
} from "@fortawesome/free-solid-svg-icons";

export const ServiceBar = () => (
        <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                {[
                    { icon: faTruckFast, title: "Miễn phí vận chuyển", sub: "Đơn từ 500k", color: "text-blue-600" },
                    { icon: faShieldHalved, title: "Bảo hành chính hãng", sub: "100% Auth", color: "text-green-600" },
                    { icon: faHeadset, title: "Hỗ trợ 24/7", sub: "Tư vấn tận tâm", color: "text-purple-600" },
                    { icon: faGift, title: "Quà tặng thành viên", sub: "Voucher mỗi tuần", color: "text-red-600" }
                ].map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors cursor-default">
                        <div className={`w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-lg ${item.color}`}>
                            <FontAwesomeIcon icon={item.icon} />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 text-sm">{item.title}</h3>
                            <p className="text-xs text-gray-500">{item.sub}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );