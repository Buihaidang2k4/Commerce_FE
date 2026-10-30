import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-10">
      <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        
        {/* Logo & mô tả */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">MyShop</h2>
          <p className="leading-relaxed text-gray-400">
            Chúng tôi cung cấp sản phẩm chất lượng, giá cả hợp lý và dịch vụ tận tâm.
          </p>
        </div>

        {/* Điều hướng */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Điều hướng</h3>
          <ul className="space-y-2">
            <li><a className="hover:text-white transition">Trang chủ</a></li>
            <li><a className="hover:text-white transition">Sản phẩm</a></li>
            <li><a className="hover:text-white transition">Giỏ hàng</a></li>
            <li><a className="hover:text-white transition">Liên hệ</a></li>
          </ul>
        </div>

        {/* Chính sách */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Chính sách</h3>
          <ul className="space-y-2">
            <li><a className="hover:text-white transition">Bảo mật</a></li>
            <li><a className="hover:text-white transition">Điều khoản</a></li>
            <li><a className="hover:text-white transition">Hoàn trả</a></li>
            <li><a className="hover:text-white transition">Vận chuyển</a></li>
          </ul>
        </div>

        {/* Liên hệ */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Liên hệ</h3>
          <p className="text-gray-400">Email: support@myshop.vn</p>
          <p className="text-gray-400">Hotline: 1900 9999</p>

          <div className="flex gap-3 mt-4">
            <a
              href="https://facebook.com"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://twitter.com"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-sky-500 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://instagram.com"
              className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 hover:bg-pink-600 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-10 border-t border-gray-700 pt-5 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MyShop. All rights reserved.
      </div>
    </footer>
  );
}
