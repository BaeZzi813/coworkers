import { bearer } from "@/features/auth/utils/token";
import { AxiosInstance } from "axios";
import { clientApiInstance } from "./instance/client";
import { serverApiInstance } from "./instance/server";

export interface APIRequestOptions {
  accessToken: string;
}

export async function apiRequest<T>(
  callback: (instance: AxiosInstance) => Promise<T>,
  options?: APIRequestOptions
) {
  if (options) {
    serverApiInstance.defaults.headers.common["Authorization"] = bearer(
      options.accessToken
    );
  }

  try {
    return await callback(options ? serverApiInstance : clientApiInstance);
  } finally {
    if (options) {
      delete serverApiInstance.defaults.headers.common["Authorization"];
    }
  }
}
