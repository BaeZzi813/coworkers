import { clientApiInstance } from "@/services/instance/client";

export interface PostTaskListParams {
  groupId: number;
  name: string;
}

export async function postTaskList({ groupId, name }: PostTaskListParams) {
  const response = await clientApiInstance.post(
    `/groups/${groupId}/task-lists`,
    { name }
  );
  return response.data;
}

interface PatchTaskListParams {
  groupId: number;
  taskListId: number;
  name: string;
}

export async function patchTaskList({
  groupId,
  taskListId,
  name,
}: PatchTaskListParams) {
  const response = await clientApiInstance.patch(
    `/groups/${groupId}/task-lists/${taskListId}`,
    { name }
  );
  return response.data;
}

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
