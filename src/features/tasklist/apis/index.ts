import { clientApiInstance } from "@/services/instance/client";

export interface DeleteTaskListParams {
  groupId: number;
  taskListId: number;
}

export async function deleteTaskList({
  groupId,
  taskListId,
}: DeleteTaskListParams) {
  await clientApiInstance.delete(`/groups/${groupId}/task-lists/${taskListId}`);
}
