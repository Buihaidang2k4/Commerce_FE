import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faApple, faGooglePlay } from "@fortawesome/free-brands-svg-icons";


export  const AppSection = () => (
        <div className="bg-gray-900 text-white py-12 mt-10 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between relative z-10">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <span className="text-orange-400 font-bold tracking-wider uppercase text-sm">Trải nghiệm tốt hơn</span>
                    <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">Tải ứng dụng ngay hôm nay</h2>
                    <p className="text-gray-400 mb-8 max-w-md">
                        Mua sắm dễ dàng, nhận thông báo khuyến mãi độc quyền và theo dõi đơn hàng mọi lúc mọi nơi.
                    </p>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-3 bg-white text-gray-900 px-4 py-2 rounded-lg hover:bg-gray-100 transition">
                            <FontAwesomeIcon icon={faApple} className="text-2xl" />
                            <div className="text-left">
                                <div className="text-[10px] uppercase font-bold">Download on the</div>
                                <div className="text-sm font-bold leading-none">App Store</div>
                            </div>
                        </button>
                        <button className="flex items-center gap-3 bg-transparent border border-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
                            <FontAwesomeIcon icon={faGooglePlay} className="text-2xl text-green-500" />
                            <div className="text-left">
                                <div className="text-[10px] uppercase font-bold">Get it on</div>
                                <div className="text-sm font-bold leading-none">Google Play</div>
                            </div>
                        </button>
                    </div>
                </div>
                {/* Hình minh họa điện thoại (Placeholder) */}
                <div className="md:w-1/2 flex justify-center md:justify-end">
                    <div className="w-64 h-96 bg-gray-800 rounded-[2.5rem] border-8 border-gray-700 shadow-2xl flex items-center justify-center relative rotate-6 hover:rotate-0 transition-all duration-500">
                        <div className="text-gray-600 font-bold">App Preview UI</div>
                        {/* Notch */}
                        <div className="absolute top-0 w-32 h-6 bg-gray-700 rounded-b-xl"></div>
                    </div>
                </div>
            </div>
            {/* Background Shape */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-800 skew-x-12 translate-x-20 opacity-50"></div>
        </div>
    );