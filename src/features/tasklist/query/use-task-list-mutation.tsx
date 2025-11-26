import { useMutation } from "@tanstack/react-query";
import { deleteTaskList, patchTaskList, postTaskList } from "../apis";

export function useTaskListMutation() {
  const postMutation = useMutation({
    mutationFn: postTaskList,
  });

  const patchMutation = useMutation({
    mutationFn: patchTaskList,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskList,
  });

  return { postMutation, patchMutation, deleteMutation };
}
