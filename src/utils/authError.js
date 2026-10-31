import { AUTH_ERROR_CODE } from '../constants/authConstants';
export default function getApiErrorMessage(error, fallback = 'Có lỗi xảy ra. Vui lòng thử lại.') {
  if (error?.response?.status === 429) {
    const seconds = Number(error.response.headers?.['retry-after']);
    return seconds > 0 ? `Bạn thao tác quá nhanh. Vui lòng thử lại sau ${Math.ceil(seconds)} giây.` : 'Bạn thao tác quá nhanh. Vui lòng thử lại sau.';
  }
  const message = error?.response?.data?.message;
  if (typeof message === 'string' && message.trim()) return message;
  if (error?.code === 'ECONNABORTED' || error?.code === 'ETIMEDOUT') return 'Kết nối quá thời gian chờ. Vui lòng thử lại.';
  if (error?.request && !error.response) return 'Không thể kết nối máy chủ. Vui lòng kiểm tra kết nối mạng.';
  if (error?.code === AUTH_ERROR_CODE.SESSION_INVALID) return 'Không thể xác minh phiên đăng nhập. Vui lòng thử lại.';
  return fallback;
}
