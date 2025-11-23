import { QueryClient } from "@tanstack/react-query";
import { getGroup } from "../apis";

interface Props {
  groupId: number;
  accessToken: string;
}

export async function prefetchGroup(
  queryClient: QueryClient,
  { groupId, accessToken }: Props
) {
  await queryClient.prefetchQuery({
    queryKey: ["groups", groupId],
    queryFn: () => getGroup({ groupId }, { accessToken }),
  });
}
