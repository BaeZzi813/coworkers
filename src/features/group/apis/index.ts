import { apiClient } from "@/services/client";
import { UserGroup } from "@/types/user-group";

export async function getUserGroups() {
  const response = await apiClient.get<UserGroup[]>("/user/groups");
  return response.data;
}
