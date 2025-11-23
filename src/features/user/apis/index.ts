import { apiRequest, APIRequestOptions } from "@/services/api-request";
import { User } from "@/types/user";

export async function getUser(options?: APIRequestOptions) {
  return apiRequest<User>(async (instance) => {
    const response = await instance.get("/user");
    return response.data;
  }, options);
}
