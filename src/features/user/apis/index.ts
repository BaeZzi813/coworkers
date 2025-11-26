import { apiRequest, APIRequestOptions } from "@/services/api-request";
import { clientApiInstance } from "@/services/instance/client";
import { UserGroup } from "@/types/group";
import { User } from "@/types/user";

export async function getUser(options?: APIRequestOptions) {
  return apiRequest<User>(async (instance) => {
    const response = await instance.get("/user");
    return response.data;
  }, options);
}

export async function getUserGroups() {
  const response = await clientApiInstance.get<UserGroup[]>("/user/groups");
  return response.data;
}
