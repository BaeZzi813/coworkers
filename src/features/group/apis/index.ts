import { UserGroup } from "@/types/user-group";
import userGroupsMock from "./user-groups-mock.json";

export async function getUserGroups(): Promise<UserGroup[]> {
  return userGroupsMock;
}
