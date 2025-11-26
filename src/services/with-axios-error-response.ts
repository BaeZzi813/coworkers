import { isAxiosError } from "axios";
import { NextApiResponse } from "next";

export async function withAxiosErrorResponse(
  res: NextApiResponse,
  callback: () => Promise<void>,
  finallyCallback?: () => void
) {
  try {
    await callback();
  } catch (error) {
    if (isAxiosError(error)) {
      res.status(error.response?.status ?? 500).json(error.response?.data);
      return;
    }
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
      return;
    }
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    finallyCallback?.();
  }
}
