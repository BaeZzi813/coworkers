import {
  clientApiInstance,
  clientProxyInstance,
} from "@/services/instance/client";
import { serverApiInstance } from "@/services/instance/server";
import { AxiosInstance } from "axios";

interface PostRefreshTokenOptions {
  ssr?: boolean;
}

export async function postRefreshToken(
  refreshToken?: string,
  options?: PostRefreshTokenOptions
): Promise<string> {
  if (options?.ssr && refreshToken) {
    return await request(serverApiInstance, { refreshToken });
  }

  if (refreshToken) {
    return await request(clientApiInstance, { refreshToken });
  }

  return await request(clientProxyInstance);
}

async function request(
  instance: AxiosInstance,
  data?: { refreshToken: string }
) {
  const response = await instance.post<{ accessToken: string }>(
    "/auth/refresh-token",
    data
  );
  return response.data.accessToken;
}
