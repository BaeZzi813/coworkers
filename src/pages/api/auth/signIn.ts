import { serializeRefreshToken } from "@/features/auth/utils/refresh-token-cookie";
import { apiClient } from "@/services/client";
import { withAxiosErrorResponse } from "@/services/with-axios-error-response";
import { User } from "@/types/user";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  withAxiosErrorResponse(res, async () => {
    const response = await apiClient.post<Response>("/auth/signIn", req.body);
    const data = response.data;
    const cookie = serializeRefreshToken(data.refreshToken);
    res.setHeader("Set-Cookie", cookie);
    res.status(200).json(data);
  });
}
