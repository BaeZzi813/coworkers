import { useQuery } from "@tanstack/react-query";
import { getUser, getUserGroups } from "../apis";

export function useUserQuery() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return { user: data };
}

export function useUserGroupsQuery() {
  const { data } = useQuery({
    queryKey: ["user", "groups"],
    queryFn: getUserGroups,
  });

  return { userGroups: data };
}
