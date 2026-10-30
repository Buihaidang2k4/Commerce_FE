import { useNavigate } from "react-router-dom"
import useAuthStore from "@/stores/useAuthStore"

export default function useHeaderAuth() {
  const navigate = useNavigate()
  const isLoggedIn = useAuthStore(state => state.isLoggedIn)

  const requireLogin = (onSuccess) => {
    if (isLoggedIn) {
      onSuccess()
      return true
    }
    return false
  }

  return {
    isLoggedIn,
    navigate,
    requireLogin,
  }
}
