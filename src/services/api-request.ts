import { bearer } from "@/features/auth/utils/token";
import { AxiosInstance } from "axios";
import { apiClient } from "./client";

export interface APIRequestOptions {
  accessToken: string;
}

export async function apiRequest<T>(
  callback: (instance: AxiosInstance) => Promise<T>,
  options?: APIRequestOptions
) {
  if (options) {
    apiClient.defaults.headers.common["Authorization"] = bearer(
      options.accessToken
    );
  }

  try {
    return await callback(apiClient);
  } finally {
    if (options) {
      delete apiClient.defaults.headers.common["Authorization"];
    }
  }
}
