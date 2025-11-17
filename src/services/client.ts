import axios from "axios";
import {
  apiRequestInterceptor,
  apiResponseErrorInterceptor,
  apiResponseInterceptor,
} from "./api-interceptor";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const proxyClient = axios.create({
  baseURL: "/api",
});

export { apiClient, proxyClient };
