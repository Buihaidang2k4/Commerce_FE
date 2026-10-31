import Swal from "sweetalert2";
import useAuthStore from "@/stores/useAuthStore";
import useExitOrder from "../order/useExitOrder";

export default function useLogout() {
  const { exitOrder } = useExitOrder();
  const {logout} = useAuthStore();

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Bạn có muốn đăng xuất không?",
      text: "Phiên đăng nhập sẽ kết thúc ngay.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#e53935",
      cancelButtonColor: "#0000FF",
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
    });

    if (result.isConfirmed) {
      try {
        const response = await logout();
        if (response.success) {
          await Swal.fire("Đăng xuất thành công", "", "success");
          exitOrder("/login");
        } else {
          await Swal.fire("Chưa thể hoàn tất đăng xuất", "Vui lòng kiểm tra kết nối và thử lại.", "error");
        }
      } catch {
        Swal.fire("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.", "error");
      }
    }
  };

  return { logout: handleLogout };
}
