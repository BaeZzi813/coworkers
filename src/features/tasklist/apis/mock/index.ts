import { Task, TaskFrequency, TaskGroup } from "@/types/task";
import taskListMock from "./task-list.json";
import todoListMock from "./todo-list.json";

export async function getTaskList(): Promise<TaskGroup[]> {
  return taskListMock.map((group) => ({
    ...group,
    tasks: group.tasks.map((task) => ({
      ...task,
      frequency: task.frequency as TaskFrequency,
    })),
  }));
}

export async function getTodoList(): Promise<Task[]> {
  return todoListMock.map((task) => ({
    ...task,
    frequency: task.frequency as TaskFrequency,
  }));
}
