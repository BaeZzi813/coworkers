export function taskCommentsQueryKey(taskId: number) {
  return ["tasks", taskId, "comments"] as const;
}
