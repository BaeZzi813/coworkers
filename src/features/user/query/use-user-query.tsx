import { useQuery } from "@tanstack/react-query";
import { getUser, getUserGroups } from "../apis";
import { userGroupsQueryKey } from "./query-key";

export function useUserQuery() {
  const { data } = useQuery({
    queryKey: ["user"],
    queryFn: () => getUser(),
  });

  return { user: data };
}

export function useUserGroupsQuery() {
  const { data, isPending, isFetching } = useQuery({
    queryKey: userGroupsQueryKey,
    queryFn: getUserGroups,
  });

  return { userGroups: data, isPending, isFetching };
}
