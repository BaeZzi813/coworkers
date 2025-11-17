import { TaskFrequency, TaskGroup } from "@/types/task";
import tasksCommentsMock from "./task-list.json";

export async function getTaskList(): Promise<TaskGroup[]> {
  return tasksCommentsMock.map((group) => ({
    ...group,
    tasks: group.tasks.map((task) => ({
      ...task,
      frequency: task.frequency as TaskFrequency,
    })),
  }));
}
