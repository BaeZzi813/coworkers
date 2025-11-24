import { Task } from "@/types/task";

export function isTaskDone(task: Task) {
  return task.doneBy?.user !== null;
}
