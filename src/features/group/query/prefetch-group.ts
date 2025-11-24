import { QueryClient } from "@tanstack/react-query";
import { getGroup, getUserGroups } from "../apis";

interface Props {
  accessToken: string;
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

export async function prefetchUserGroups(
  queryClient: QueryClient,
  { accessToken }: Props
) {
  await queryClient.prefetchQuery({
    queryKey: ["user", "groups"],
    queryFn: () => getUserGroups({ accessToken }),
  });
}
