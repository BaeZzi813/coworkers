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
