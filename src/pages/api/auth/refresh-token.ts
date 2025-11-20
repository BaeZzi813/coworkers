import { apiClient } from "@/services/client";
import { withAxiosErrorResponse } from "@/services/with-axios-error-response";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  accessToken: string;
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
    const response = await apiClient.post<Response>("/auth/refresh-token", {
      refreshToken: req.cookies.refreshToken,
    });
    res.status(200).json(response.data);
  });
}
