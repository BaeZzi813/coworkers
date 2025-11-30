import { useQuery } from "@tanstack/react-query";
import { getTask, getTasks } from "../apis";
import { taskQueryKey, tasksQueryKey } from "./query-key";

interface UseTasksQueryProps {
  groupId: number;
  taskListId: number;
  date?: string;
  enabled?: boolean;
}

export function useTasksQuery({
  groupId,
  taskListId,
  date,
  enabled,
}: UseTasksQueryProps) {
  const { data: tasks, isFetching } = useQuery({
    queryKey: tasksQueryKey({ groupId, taskListId, date }),
    queryFn: () => getTasks({ groupId, taskListId, date }),
    enabled,
  });

  return { tasks, isFetching };
}

interface UseTaskQueryProps {
  groupId: number;
  taskListId: number;
  taskId: number;
  enabled?: boolean;
}

export function useTaskQuery({
  groupId,
  taskListId,
  taskId,
  enabled,
}: UseTaskQueryProps) {
  const { data: task, isFetching } = useQuery({
    queryKey: taskQueryKey({ groupId, taskListId, taskId }),
    queryFn: () => getTask({ groupId, taskListId, taskId }),
    enabled,
  });

  return { task, isFetching };
}
