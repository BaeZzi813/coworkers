import {
  clientRequestInterceptor,
  clientResponseErrorInterceptor,
  clientResponseInterceptor,
} from "@/services/interceptor/client";
import axios from "axios";

export const clientApiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

export const clientProxyInstance = axios.create({
  baseURL: "/api",
});

clientApiInstance.interceptors.request.use(clientRequestInterceptor);
clientApiInstance.interceptors.response.use(
  clientResponseInterceptor,
  clientResponseErrorInterceptor
);
