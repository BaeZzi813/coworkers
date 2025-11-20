import axios from "axios";

export const serverApiInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
});
