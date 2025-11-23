import { postRefreshToken } from "@/features/auth/apis";
import { getUser } from "@/features/user/apis/get-user";
import { useAuthStore } from "@/stores/auth-store";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import { useShallow } from "zustand/shallow";

export default function AuthProvider({ children }: PropsWithChildren) {
  const router = useRouter();
  const [login, logout] = useAuthStore(
    useShallow((state) => [state.logIn, state.logOut])
  );
  const refreshToken = useAuthStore((state) => state.refreshToken);

  const initializeAuth = async () => {
    try {
      if (["/", "/login", "/signup"].includes(router.pathname)) {
        return;
      }

      const accessToken = await postRefreshToken();
      refreshToken({ accessToken });

      const user = await getUser();
      login({ user, accessToken });
    } catch (error) {
      if (isAxiosError(error) && error.response?.status === 400) {
        router.replace("/login");
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
