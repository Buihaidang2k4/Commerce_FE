// src/pages/Unauthorized.jsx (Tạo mới hoặc code inline trong AppRouter)
import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">403 - Truy cập bị từ chối</h1>
        <p className="mb-6">Bạn không có quyền truy cập vào trang này.</p>
        <Link to="/" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Về trang chủ
        </Link>
    </div>
  );
}