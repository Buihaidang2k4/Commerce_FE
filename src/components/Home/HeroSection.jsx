import bannerImg from "@/assets/image/banners/banner.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

export const HeroSection = () => (
    <div className="relative w-full p-5 bg-white">
        <div className="relative w-full max-w-7xl mx-auto rounded-3xl overflow-hidden shadow-2xl group h-[350px] md:h-[450px]">
            <img
                src={bannerImg}
                alt="banner"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>
            <div className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 text-white max-w-lg">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase mb-4 inline-block">New Arrival</span>
                <h2 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg mb-4 leading-tight">
                    Khám phá <br /> Công nghệ mới
                </h2>
                <p className="text-lg opacity-90 mb-6 font-light">
                    Trải nghiệm đỉnh cao với bộ sưu tập mới nhất. Giảm giá 30% cho thành viên mới.
                </p>
                <button className="bg-white text-gray-900 px-8 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-all transform hover:-translate-y-1 flex items-center gap-2">
                    Mua ngay <FontAwesomeIcon icon={faChevronRight} size="xs" />
                </button>
            </div>
        </div>
    </div>
);