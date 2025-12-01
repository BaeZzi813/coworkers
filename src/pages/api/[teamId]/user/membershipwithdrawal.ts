import { createExpiredCookie } from "@/features/auth/utils/cookie";
import { serverApiInstance } from "@/services/instance/server";
import { withAxiosErrorResponse } from "@/services/with-axios-error-response";
import { NextApiRequest, NextApiResponse } from "next";

interface Response {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const { teamId } = req.query;

  if (!teamId || typeof teamId !== "string") {
    res.status(400).json({ message: "teamId is required" });
    return;
  }

  serverApiInstance.defaults.headers.common.Authorization =
    req.headers.authorization;

  withAxiosErrorResponse(
    res,
    async () => {
      const response = await serverApiInstance.delete<Response>(`/user`);
      // 회원 탈퇴 성공 시 refreshToken 쿠키 삭제
      const cookie = createExpiredCookie({ name: "refreshToken" });
      res.setHeader("Set-Cookie", cookie);
      res.status(200).json(response.data);
    },
    () => {
      delete serverApiInstance.defaults.headers.common.Authorization;
    }
  );
}
