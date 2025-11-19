import { Task, TaskFrequency, TaskList } from "@/types/task";
import taskListMock from "./task-list.json";
import todoListMock from "./todo-list.json";

export async function getTaskList(): Promise<TaskList[]> {
  return (taskListMock as TaskList[]).map((group) => ({
    ...group,
    tasks: (group.tasks ?? []).map((task) => ({
      ...task,
      frequency: task.frequency as TaskFrequency,
    })),
  }));
}

export async function getTodoList(
  taskId: number,
  date?: Date
): Promise<Task[]> {
  return (todoListMock as Task[])
    .filter((task) => task.id === taskId)
    .filter((task) =>
      date ? task.date.slice(0, 10) === date.toISOString().slice(0, 10) : true
    )
    .map((task) => ({
      ...task,
      frequency: task.frequency as TaskFrequency,
    }));
}
