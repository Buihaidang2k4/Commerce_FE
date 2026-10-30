import { useEffect } from "react";
import { queryClient } from "./queryClient";
import useAuthStore from "./useAuthStore";

// sync react query cache
export default function AuthSyncProvider({ children }) {
  const isLoggedIn = useAuthStore((s) => s.isLoggedIn);

  useEffect(() => {
    if (!isLoggedIn) {
      queryClient.clear();
    }
  }, [isLoggedIn]);

  return children;
}
