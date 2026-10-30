import React from "react";
import { ToastContainer, toast, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// 1. Định nghĩa Icon SVG đẹp mắt (Thay vì dùng thư viện icon nặng nề)
const Icons = {
  success: (
    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center shrink-0">
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
    </div>
  ),
  error: (
    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center shrink-0">
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
    </div>
  ),
  warning: (
    <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center shrink-0">
        <svg className="w-6 h-6 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
    </div>
  ),
  info: (
    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center shrink-0">
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    </div>
  )
};

// 2. Component hiển thị nội dung Toast tùy chỉnh
// Giúp ta kiểm soát hoàn toàn layout thay vì để thư viện tự render
const ToastContent = ({ title, message, type }) => (
  <div className="flex items-start gap-4 p-1">
    {Icons[type]}
    <div className="flex flex-col pt-0.5">
      <h4 className="font-bold text-gray-800 text-sm leading-tight mb-1 capitalize">
        {title || type}
      </h4>
      <p className="text-gray-500 text-sm leading-snug">{message}</p>
    </div>
  </div>
);

// 3. Config chung
const defaultConfig = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: true, 
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  transition: Slide, 
  className: "custom-toast-container",
  bodyClassName: "custom-toast-body",
};

// 4. API notify export ra ngoài
export const notify = {
  success: (message, title = "Success") =>
    toast(<ToastContent type="success" title={title} message={message} />, { ...defaultConfig }),
  
  error: (message, title = "Error") =>
    toast(<ToastContent type="error" title={title} message={message} />, { ...defaultConfig }),
  
  info: (message, title = "Info") =>
    toast(<ToastContent type="info" title={title} message={message} />, { ...defaultConfig }),
  
  warning: (message, title = "Warning") =>
    toast(<ToastContent type="warning" title={title} message={message} />, { ...defaultConfig }),
};

// 5. Component Provider & CSS Override
export default function NotifyProvider() {
  return (
    <>
      {/* Override CSS của React Toastify để dùng Tailwind classes */}
      <style>{`
        :root {
          --toastify-color-light: #ffffff;
          --toastify-text-color-light: #374151;
        }
        .Toastify__toast {
          border-radius: 12px !important;
          padding: 12px 16px !important;
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important; /* Tailwind shadow-lg */
          margin-bottom: 1rem !important;
          border: 1px solid #f3f4f6; /* Tailwind gray-100 */
        }
        /* Ẩn nút close mặc định xấu xí đi, hoặc thay bằng custom nếu muốn */
        .Toastify__close-button {
            color: #9ca3af !important;
            opacity: 0.7;
        }
        .Toastify__close-button:hover {
            opacity: 1;
        }
      `}</style>
      
      <ToastContainer 
        stacked // Tính năng mới: xếp chồng lên nhau đẹp hơn
        newestOnTop={true}
        className="!mt-4" // Dùng !mt-4 của tailwind để ghi đè style gốc nếu cần
      />
    </>
  );
}