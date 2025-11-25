import { useMutation } from "@tanstack/react-query";
import { deleteTaskList, postTaskList } from "../apis";

export function useTaskListMutation() {
  const postMutation = useMutation({
    mutationFn: postTaskList,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTaskList,
  });

  return { postMutation, deleteMutation };
}
