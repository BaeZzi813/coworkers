import { clientApiInstance } from "@/services/instance/client";
import { TaskComment } from "@/types/comment";

interface getTaskCommentsParams {
  taskId: number;
}

export async function getTaskComments({ taskId }: getTaskCommentsParams) {
  const response = await clientApiInstance.get<TaskComment[]>(
    `/tasks/${taskId}/comments`
  );
  return response.data;
}

export type TaskCommentResult = Partial<TaskComment>;
export interface PostTaskCommentParams {
  taskId: number;
  content: string;
}
export async function postTaskComment({
  taskId,
  content,
}: PostTaskCommentParams) {
  const response = await clientApiInstance.post<TaskCommentResult>(
    `/tasks/${taskId}/comments`,
    { content }
  );
  return response.data;
}

export interface PatchTaskComentParams {
  taskId: number;
  commentId: number;
  content: string;
}
export async function patchTaskComment({
  taskId,
  commentId,
  content,
}: PatchTaskComentParams) {
  const response = await clientApiInstance.patch<TaskCommentResult>(
    `/tasks/${taskId}/comments/${commentId}`,
    { content }
  );
  return response.data;
}

export interface DeleteTskCommentParams {
  taskId: number;
  commentId: number;
}
export async function deleteTaskComment({
  taskId,
  commentId,
}: DeleteTskCommentParams) {
  await clientApiInstance.delete(`/tasks/${taskId}/comments/${commentId}`);
}
