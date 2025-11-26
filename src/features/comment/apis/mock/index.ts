import tasksCommentsMock from "./tasks-comments-mock.json";

export async function getTasksComments(taskId: number) {
  return tasksCommentsMock.filter((comment) => comment.taskId === taskId);
}
