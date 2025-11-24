import { apiRequest, type APIRequestOptions } from "@/services/api-request";
import { Group, UserGroup } from "@/types/group";

export async function getUserGroups(options?: APIRequestOptions) {
  return apiRequest<UserGroup[]>(async (instance) => {
    const response = await instance.get<UserGroup[]>("/user/groups");
    return response.data;
  }, options);
}

export async function getGroup(
  params: { groupId: number },
  options?: APIRequestOptions
) {
  return apiRequest<Group>(async (instance) => {
    const response = await instance.get(`/groups/${params.groupId}`);
    return response.data;
  }, options);
}
