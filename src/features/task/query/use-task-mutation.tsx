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
    mutationFn: (body) => postTask({ groupId, taskListId, body }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: tasksQueryKey({ groupId, taskListId }),
      });
    },
  });

  const patchMutation = useMutation<PatchTaskResult, Error, PatchTaskParams>({
    mutationFn: (params) => patchTask({ groupId, taskListId, params }),
    ...options,
  });

  return { postMutation, patchMutation };
}
