import { useMutation } from "@tanstack/react-query";
import { deleteTaskList } from "../apis";

export function useTaskListMutation() {
  const deleteMutation = useMutation({
    mutationFn: deleteTaskList,
  });

  return { deleteMutation };
}
