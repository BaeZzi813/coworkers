import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  deleteTask,
  patchTask,
  PatchTaskParams,
  PatchTaskResult,
  postTask,
  PostTaskBody,
  PostTaskResult,
} from "../apis";
import { taskQueryKey, tasksQueryKey } from "./query-key";

interface TaskMutationProps
  extends Pick<
    MutationOptions<PatchTaskResult, Error, PatchTaskParams>,
    "onMutate" | "onSuccess" | "onError" | "onSettled"
  > {
  groupId: number;
  taskListId: number;
}

export function useTaskMutation({
  groupId,
  taskListId,
  ...options
}: TaskMutationProps) {
  const queryClient = useQueryClient();

  const postMutation = useMutation<PostTaskResult, Error, PostTaskBody>({
    mutationFn: (params) => postTask({ groupId, taskListId, params }),
    onSuccess: (newTask) => {
      queryClient.invalidateQueries({
        queryKey: tasksQueryKey({
          groupId,
          taskListId,
          date: newTask.startDate,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKey({ groupId, taskListId }),
      });
    },
  });

  const patchMutation = useMutation<PatchTaskResult, Error, PatchTaskParams>({
    mutationFn: (params) => patchTask({ groupId, taskListId, params }),
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({
        queryKey: tasksQueryKey({
          groupId,
          taskListId,
          date: updatedTask.date,
        }),
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKey({ groupId, taskListId }),
      });
    },
    ...options,
  });

  const deleteMutation = useMutation<void, Error, number, unknown>({
    mutationFn: (taskId) => deleteTask({ groupId, taskListId, taskId }),
    onSuccess: (_, taskId) => {
      queryClient.invalidateQueries({
        queryKey: taskQueryKey({ groupId, taskListId, taskId }),
      });
      queryClient.invalidateQueries({
        queryKey: tasksQueryKey({ groupId, taskListId }),
      });
    },
  });

  return { postMutation, patchMutation, deleteMutation };
}
