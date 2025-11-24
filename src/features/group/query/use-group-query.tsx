import { useAuthStore } from "@/stores/auth-store";
import { useQuery } from "@tanstack/react-query";
import { getGroup, getGroups } from "../apis";

export function useGroupsQuery() {
  const accessToken = useAuthStore((state) => state.accessToken);
  const { data, isPending } = useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups({ accessToken }),
  });
  return { groups: data, isPending };
}

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
