import { useNavigate } from "react-router-dom";

export default function Error({ 
  title = "Oops! Có lỗi xảy ra", 
  message = "Đã xảy ra lỗi không mong muốn." 
}) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 px-6">
      {/* Icon minh họa */}
      <div className="mb-6">
        <svg
          className="w-20 h-20 text-red-500"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Tiêu đề */}
      <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>

      {/* Thông điệp lỗi */}
      <p className="text-gray-600 mb-6 max-w-md text-center">{message}</p>

      {/* Nút hành động */}
      <div className="flex gap-4">
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg shadow hover:bg-gray-300 transition"
        >
          Quay lại
        </button>
        <button
          onClick={() => navigate("/home-private")}
          className="px-6 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        >
          Về trang chủ
        </button>
      </div>
    </div>
  );
}