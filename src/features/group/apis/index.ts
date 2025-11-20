import { apiRequest, type APIRequestOptions } from "@/services/api-request";
import { UserGroup } from "@/types/user-group";

export async function getUserGroups(options?: APIRequestOptions) {
  return apiRequest<UserGroup[]>(async (instance) => {
    const response = await instance.get<UserGroup[]>("/user/groups");
    return response.data;
  }, options);
}
