import { MutationOptions, useMutation } from "@tanstack/react-query";
import { patchTask, PatchTaskParams, PatchTaskResult } from "../apis";

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
  const patchMutation = useMutation<PatchTaskResult, Error, PatchTaskParams>({
    mutationFn: (params) => patchTask({ groupId, taskListId, params }),
    ...options,
  });

  return { patchMutation };
}
