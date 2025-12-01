interface Keys {
  groupId: number;
  taskListId: number;
}

export function taskListQueryKey({ groupId, taskListId }: Keys) {
  return [groupId, "task-lists", taskListId] as const;
}
