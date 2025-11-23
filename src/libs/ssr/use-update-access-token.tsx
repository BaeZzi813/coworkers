import { useAuthStore } from "@/stores/auth-store";
import { useEffect } from "react";

export function useUpdateAccessToken(accessToken: string) {
  const refreshToken = useAuthStore((state) => state.refreshToken);

  useEffect(() => {
    refreshToken({ accessToken });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken]);
}
