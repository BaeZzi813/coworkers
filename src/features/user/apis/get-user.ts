import { apiClient } from "@/services/client";
import { User } from "@/types/user";

type GetUserResponse = User;

export async function getUser() {
  const response = await apiClient.get<GetUserResponse>("/user");
  return response.data;
}
