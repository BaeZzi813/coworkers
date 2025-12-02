import { QueryClient } from "@tanstack/react-query";
import { getTaskList } from "../apis/";
import { taskListQueryKey } from "./query-key";

interface Props {
  accessToken: string;
}

export async function prefetchTaskList(
  queryClient: QueryClient,
  {
    groupId,
    taskListId,
    accessToken,
  }: Props & { groupId: number; taskListId: number }
) {
  await queryClient.prefetchQuery({
    queryKey: taskListQueryKey({ groupId, taskListId }),
    queryFn: () => getTaskList({ groupId, taskListId }, { accessToken }),
  });
}
