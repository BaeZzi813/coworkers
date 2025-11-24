import { QueryClient } from "@tanstack/react-query";
import { getGroup, getGroups } from "../apis";

interface Props {
  accessToken: string;
}

export async function prefetchGroups(
  queryClient: QueryClient,
  { accessToken }: Props
) {
  await queryClient.prefetchQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups({ accessToken }),
  });
}

export async function prefetchGroup(
  queryClient: QueryClient,
  { groupId, accessToken }: Props & { groupId: number }
) {
  await queryClient.prefetchQuery({
    queryKey: ["groups", groupId],
    queryFn: () => getGroup({ groupId }, { accessToken }),
  });
}
