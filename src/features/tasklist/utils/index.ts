import { isTaskDone } from "@/features/task/utils";
import { TaskList } from "@/types/task";
import { isEmpty } from "@/utils/array-sugar";

export function isTaskListDone(taskList: TaskList): boolean {
  if (isEmpty(taskList.tasks)) return false;
  return taskList.tasks.every(isTaskDone);
}
