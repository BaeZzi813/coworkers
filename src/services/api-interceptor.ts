import { postSignOut } from "@/features/auth/apis";
import { postRefreshToken } from "@/features/auth/apis/post-refresh-token";
import { useAuthStore } from "@/stores/auth-store";
import {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";
import { apiClient } from "./client";

export function apiRequestInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
}

const MAX_RETRY_COUNT = 1;
let retryCount = 0;

export async function apiResponseInterceptor(response: AxiosResponse) {
  retryCount = 0;
  return response;
}

export async function apiResponseErrorInterceptor(error: AxiosError) {
  if (error.response?.status !== 401) {
    return Promise.reject(error);
  }

  if (retryCount >= MAX_RETRY_COUNT) {
    await postSignOut();
    useAuthStore.getState().logOut();
    retryCount = 0;
    window.location.href = "/login";
    return Promise.reject(error);
  }

  const config = error.config;
  if (!config) {
    return Promise.reject(error);
  }

  try {
    const { accessToken } = await postRefreshToken();
    useAuthStore.getState().refreshToken({ accessToken });
    config.headers.Authorization = `Bearer ${accessToken}`;
    retryCount++;
    return apiClient.request(config as AxiosRequestConfig);
  } catch (refreshError) {
    if (isAxiosError(refreshError) && refreshError.response?.status === 400) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
}
