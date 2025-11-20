import { clientApiInstance } from "@/services/instance/client";
import { User } from "@/types/user";

type GetUserResponse = User;

export async function getUser() {
  const response = await clientApiInstance.get<GetUserResponse>("/user");
  return response.data;
}
