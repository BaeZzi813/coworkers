import {
  MutationOptions,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import {
  patchTask,
  PatchTaskParams,
  PatchTaskResult,
  postTask,
  PostTaskBody,
  PostTaskResult,
} from "../apis";
import { tasksQueryKey } from "./query-key";

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

  return { postMutation, patchMutation };
}
