import { clientApiInstance } from "@/services/instance/client";
import { Task, TaskFrequency } from "@/types/task";

interface GetTasksParams {
  groupId: number;
  taskListId: number;
  date?: string;
}

export async function getTasks({ groupId, taskListId, date }: GetTasksParams) {
  const response = await clientApiInstance.get<Task[]>(
    endpoint(groupId, taskListId),
    {
      params: date ? { date } : null,
    }
  );
  return response.data;
}

interface GetTaskParams {
  groupId: number;
  taskListId: number;
  taskId: number;
}

export async function getTask({ groupId, taskListId, taskId }: GetTaskParams) {
  const response = await clientApiInstance.get<Task>(
    endpoint(groupId, taskListId, taskId)
  );
  return response.data;
}

export interface PatchTaskParams {
  taskId: number;
  name?: string;
  description?: string;
  done?: boolean;
}

/**
 * Task PATCH API 호출 시 반환되는 data type 입니다.
 * Task type과 유사하지만 구조가 다르고 사용되는 범위가 다르기 때문에 result type으로 분리합니다.
 */
export interface PatchTaskResult {
  id: number;
  updatedAt: string;
  date: string;
  doneAt: string | null;
  recurringId: number;
  name: string;
  description: string;
  frequency: TaskFrequency;
  deletedAt: string | null;
  userId: number;
  writerId: number;
  displayIndex: number;
}

interface PatchTaskProps {
  groupId: number;
  taskListId: number;
  params: PatchTaskParams;
}

export async function patchTask({
  groupId,
  taskListId,
  params: { taskId, ...body },
}: PatchTaskProps) {
  const response = await clientApiInstance.patch<PatchTaskResult>(
    endpoint(groupId, taskListId, taskId),
    body
  );
  return response.data;
}

function endpoint(groupId: number, taskListId: number, taskId?: number) {
  const base = `/groups/${groupId}/task-lists/${taskListId}/tasks`;

  if (taskId) {
    return base + `/${taskId}`;
  }

  return base;
}
