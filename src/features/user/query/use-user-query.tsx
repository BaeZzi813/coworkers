import { useQuery } from "@tanstack/react-query";
import { getUser, getUserGroups, getUserHistory } from "../apis";
import { USER_HISTORY_QUERY_KEY, userGroupsQueryKey } from "./query-key";

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

export function useUserHistoryQuery() {
  const { data } = useQuery({
    queryKey: USER_HISTORY_QUERY_KEY,
    queryFn: () => getUserHistory(),
    refetchOnMount: "always",
  });

  return { history: data };
}
