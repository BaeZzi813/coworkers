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
  if (req.method !== "PATCH") {
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
      const response = await serverApiInstance.patch<Response>(
        `/user/password`,
        req.body
      );
      res.status(200).json(response.data);
    },
    () => {
      delete serverApiInstance.defaults.headers.common.Authorization;
    }
  );
}
