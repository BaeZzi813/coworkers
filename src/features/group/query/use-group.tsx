import { useQuery } from "@tanstack/react-query";
import { getGroup } from "../apis";

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
