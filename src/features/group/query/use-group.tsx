import { useQuery } from "@tanstack/react-query";
import { getGroup, getUserGroups } from "../apis";

interface Props {
  groupId: number;
}

export function useGroup({ groupId }: Props) {
  const { data } = useQuery({
    queryKey: ["groups", groupId],
    queryFn: () => getGroup({ groupId }),
  });

  return { group: data };
}

export function useUserGroups() {
  const { data } = useQuery({
    queryKey: ["user", "groups"],
    queryFn: () => getUserGroups(),
  });

  return { userGroups: data };
}
