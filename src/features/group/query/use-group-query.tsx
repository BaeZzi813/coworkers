import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { getGroup, getGroups } from "../apis";
import { groupsQueryKey } from "./query-key";

export function useGroupsQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data, isPending } = useQuery({
    queryKey: groupsQueryKey(),
    queryFn: () => getGroups({ accessToken }),
  });
  return { groups: data, isPending };
}

interface Params {
  groupId: number;
}

export function useGroupQuery({ groupId }: Params) {
  const { data, isFetching } = useQuery({
    queryKey: groupsQueryKey({ groupId }),
    queryFn: () => getGroup({ groupId }),
  });

  return { group: data, isFetching };
}
