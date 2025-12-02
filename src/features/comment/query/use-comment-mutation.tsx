import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskComment, patchTaskComment, postTaskComment } from "../apis";
import { taskCommentsQueryKey } from "./query-key";

interface TaskCommentMutationProps {
  taskId: number;
}
export function useTaskCommentMutation({ taskId }: TaskCommentMutationProps) {
  const queryClient = useQueryClient();
  const handleMutationSuccess = () => {
    queryClient.invalidateQueries({ queryKey: taskCommentsQueryKey(taskId) });
  };

  const postMutation = useMutation({
    mutationFn: postTaskComment,
    onSuccess: handleMutationSuccess,
  });

  const patchMutation = useMutation({
    mutationFn: patchTaskComment,
    onSuccess: handleMutationSuccess,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskComment,
    onSuccess: handleMutationSuccess,
  });

  return { postMutation, patchMutation, deleteMutation };
}
