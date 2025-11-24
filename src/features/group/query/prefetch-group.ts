import { QueryClient } from "@tanstack/react-query";
import { getGroup, getGroups } from "../apis";
import { groupsQueryKey } from "./query-key";

interface Props {
  accessToken: string;
}

export async function prefetchGroups(
  queryClient: QueryClient,
  { accessToken }: Props
) {
  await queryClient.prefetchQuery({
    queryKey: groupsQueryKey(),
    queryFn: () => getGroups({ accessToken }),
  });
}

export async function prefetchGroup(
  queryClient: QueryClient,
  { groupId, accessToken }: Props & { groupId: number }
) {
  await queryClient.prefetchQuery({
    queryKey: groupsQueryKey({ groupId }),
    queryFn: () => getGroup({ groupId }, { accessToken }),
  });
}
