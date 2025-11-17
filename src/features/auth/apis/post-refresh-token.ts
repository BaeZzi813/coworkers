import { proxyClient } from "@/services/client";

interface RefreshTokenResponse {
  accessToken: string;
}

export async function postRefreshToken(): Promise<RefreshTokenResponse> {
  const response = await proxyClient.post<RefreshTokenResponse>(
    "/auth/refresh-token"
  );
  return response.data;
}
