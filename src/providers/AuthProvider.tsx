import { getUser } from "@/features/user/apis/get-user";
import { useAuthStore } from "@/stores/auth-store";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { postRefreshToken } from "../features/auth/apis";
import { redirectWhitelist } from "../features/auth/constants/redirect-whitelist";

export default function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [login, logout] = useAuthStore(
    useShallow((state) => [state.logIn, state.logOut])
  );
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const initializeAuth = async () => {
    try {
      const { accessToken } = await postRefreshToken();
      refreshToken({ accessToken });

      const user = await getUser();
      login({ user, accessToken });
    } catch (error) {
      if (
        isAxiosError(error) &&
        error.response?.status === 400 &&
        !redirectWhitelist.includes(router.pathname)
      ) {
        router.replace("/");
        logout();
      }
    }
  };

  useEffect(() => {
    initializeAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return children;
}
