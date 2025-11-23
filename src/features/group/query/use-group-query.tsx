import { useQuery } from "@tanstack/react-query";
import { getGroup, getUserGroups } from "../apis";

interface Params {
  groupId: number;
}

export function useGroupQuery({ groupId }: Params) {
  const { data } = useQuery({
    queryKey: ["groups", groupId],
    queryFn: () => getGroup({ groupId }),
  });

  return { group: data };
}

export function useUserGroupsQuery() {
  const { data } = useQuery({
    queryKey: ["user", "groups"],
    queryFn: () => getUserGroups(),
  });

  return { userGroups: data };
}
