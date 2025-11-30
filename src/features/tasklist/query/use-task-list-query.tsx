import { useQuery } from "@tanstack/react-query";
import { getTaskList } from "../apis";
import { taskListQueryKey } from "./query-key";

export function useTaskListQuery({
  groupId,
  taskListId,
}: {
  groupId: number;
  taskListId: number;
}) {
  const { data, isPending } = useQuery({
    queryKey: taskListQueryKey({ groupId, taskListId }),
    queryFn: () => getTaskList({ groupId, taskListId }),
  });
  return { taskList: data, isPending };
}
