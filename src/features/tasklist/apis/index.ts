import { apiRequest, APIRequestOptions } from "@/services/api-request";
import { clientApiInstance } from "@/services/instance/client";
import { TaskList } from "@/types/task";
import { AxiosResponse } from "axios";

interface GetTaskListParams {
  date?: string;
}

interface GetTaskListProps extends GetTaskListParams {
  groupId: number;
  taskListId: number;
}

export async function getTaskList(
  { groupId, taskListId, date }: GetTaskListProps,
  options?: APIRequestOptions
) {
  return apiRequest(async (instance) => {
    const response = await instance.get<TaskList, AxiosResponse<TaskList>>(
      `/groups/${groupId}/task-lists/${taskListId}`,
      { params: date ? { date } : null }
    );
    return response.data;
  }, options);
}

interface PostTaskListParams {
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

interface DeleteTaskListParams {
  groupId: number;
  taskListId: number;
}

export async function deleteTaskList({
  groupId,
  taskListId,
}: DeleteTaskListParams) {
  await clientApiInstance.delete(`/groups/${groupId}/task-lists/${taskListId}`);
}
