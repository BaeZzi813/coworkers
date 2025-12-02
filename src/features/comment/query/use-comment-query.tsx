import { useQuery } from "@tanstack/react-query";
import { getTaskComments } from "../apis";
import { taskCommentsQueryKey } from "./query-key";

interface UseTaskCommentsQueryProps {
  taskId: number;
  enabled?: boolean;
}

export function useTaskCommentsQuery({
  taskId,
  enabled,
}: UseTaskCommentsQueryProps) {
  const { data } = useQuery({
    queryKey: taskCommentsQueryKey(taskId),
    queryFn: () => getTaskComments({ taskId }),
    enabled,
    initialData: [],
  });

  return { taskComments: data };
}
