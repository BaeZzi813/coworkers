import { Task, TaskFrequency, TaskList } from "@/types/task";
import taskListMock from "./task-list.json";

export async function getTaskList(): Promise<TaskList[]> {
  return (taskListMock as TaskList[]).map((group) => ({
    ...group,
    tasks: group.tasks.map((task) => ({
      ...task,
      frequency: task.frequency as TaskFrequency,
    })),
  }));
}

export async function getTodoList(
  taskListId: number,
  date?: Date
): Promise<Task[]> {
  const taskList = (taskListMock as TaskList[]).find(
    (task) => task.id === taskListId
  );
  if (!taskList) return [];

  return taskList.tasks
    .filter((task) =>
      date ? task.date.slice(0, 10) === date.toISOString().slice(0, 10) : true
    )
    .map((task) => ({
      ...task,
      frequency: task.frequency as TaskFrequency,
    }));
}

export async function getTodo(
  taskId: number,
  todoId: number
): Promise<Task | null> {
  const taskList = (taskListMock as TaskList[]).find(
    (task) => task.id === taskId
  );

  const todo = taskList?.tasks
    .filter((todo) => todo.id === todoId)
    .map((todo) => ({
      ...todo,
      frequency: todo.frequency as TaskFrequency,
    }))[0];

  return todo ?? null;
}
