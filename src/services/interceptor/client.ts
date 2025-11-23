import { postRefreshToken, postSignOut } from "@/features/auth/apis";
import { bearer } from "@/features/auth/utils/token";
import { useAuthStore } from "@/stores/auth-store";
import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  isAxiosError,
} from "axios";

export function clientRequestInterceptor(config: InternalAxiosRequestConfig) {
  const accessToken = useAuthStore.getState().accessToken;
  if (accessToken) {
    config.headers.Authorization = bearer(accessToken);
  }
  return config;
}

const MAX_RETRY_COUNT = 1;
let retryCount = 0;

export async function clientResponseInterceptor(response: AxiosResponse) {
  retryCount = 0;
  return response;
}

export async function clientResponseErrorInterceptor(error: AxiosError) {
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
    const accessToken = await postRefreshToken();
    useAuthStore.getState().refreshToken({ accessToken });
    config.headers.Authorization = bearer(accessToken);
    retryCount++;
    return axios.request(config as AxiosRequestConfig);
  } catch (refreshError) {
    if (isAxiosError(refreshError) && refreshError.response?.status === 400) {
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
}
