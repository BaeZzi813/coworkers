import { createExpiredCookie } from "@/features/auth/utils/cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ message: "Method Not Allowed" });
    return;
  }

  const cookie = createExpiredCookie({ name: "refreshToken" });
  res.setHeader("Set-Cookie", cookie);
  res.status(200).json({ message: "Logged out successfully" });

  return;
}
