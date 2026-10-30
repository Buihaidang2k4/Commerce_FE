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
        logout();
        Swal.fire("Đăng xuất thành công", "", "success");
        exitOrder("/login");
      } catch (error) {
        console.error("Logout error:", error);
        Swal.fire("Lỗi", "Không thể đăng xuất. Vui lòng thử lại.", "error");
      }
    }
  };

  return { logout: handleLogout };
}
