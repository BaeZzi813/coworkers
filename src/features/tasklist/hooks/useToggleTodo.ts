import { Task } from "@/types/task";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { patchTodo } from "../apis/mock";

interface ToggleArgs {
  taskId: number;
  todoId: number;
  done: boolean;
}

export function useToggleTodo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ taskId, todoId, done }: ToggleArgs) =>
      patchTodo(taskId, todoId, { done }),
    onMutate: async ({ taskId, todoId, done }) => {
      const newDoneAt = done ? new Date().toISOString() : null;

      await queryClient.cancelQueries({
        queryKey: ["todo-detail", taskId, todoId],
      });
      await queryClient.cancelQueries({
        queryKey: ["todo-list", taskId],
      });

      const prevDetail = queryClient.getQueryData<Task>([
        "todo-detail",
        taskId,
        todoId,
      ]);
      const prevList = queryClient.getQueryData<Task[]>(["todo-list", taskId]);

      if (prevDetail) {
        queryClient.setQueryData(["todo-detail", taskId, todoId], {
          ...prevDetail,
          doneAt: newDoneAt,
        });
      }
      if (prevList) {
        queryClient.setQueryData<Task[]>(["todo-list", taskId], (old) =>
          (old ?? []).map((todo) =>
            todo.id === todoId ? { ...todo, doneAt: newDoneAt } : todo
          )
        );
      }

      return { prevDetail, prevList };
    },
    onError: (_err, { taskId, todoId }, ctx) => {
      if (!ctx) return;

      if (ctx.prevDetail) {
        queryClient.setQueryData(
          ["todo-detail", taskId, todoId],
          ctx.prevDetail
        );
      }
      if (ctx.prevList) {
        queryClient.setQueryData(["todo-list", taskId], ctx.prevList);
      }
    },
    onSettled: (_data, _err, { taskId, todoId }) => {
      queryClient.invalidateQueries({
        queryKey: ["todo-detail", taskId, todoId],
      });
      queryClient.invalidateQueries({
        queryKey: ["todo-list", taskId],
      });
    },
  });
}
