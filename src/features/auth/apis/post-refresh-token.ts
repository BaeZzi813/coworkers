import { apiClient, proxyClient } from "@/services/client";

interface RefreshTokenResponse {
  accessToken: string;
}

export async function postProxyRefreshToken(): Promise<RefreshTokenResponse> {
  const response = await proxyClient.post<RefreshTokenResponse>(
    "/auth/refresh-token"
  );
  return response.data;
}

export async function postAPIRefreshToken({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<RefreshTokenResponse> {
  const response = await apiClient.post<RefreshTokenResponse>(
    "/auth/refresh-token",
    { refreshToken }
  );
  return response.data;
}
