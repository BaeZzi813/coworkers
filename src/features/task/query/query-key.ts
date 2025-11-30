interface Keys {
  groupId: number;
  taskListId: number;
  date?: string;
}

export function tasksQueryKey({ groupId, taskListId, date }: Keys) {
  const base = ["groups", groupId, "task-lists", taskListId, "tasks"] as const;

  if (date) {
    return [...base, date] as const;
  }

  return base;
}

export function taskQueryKey({
  groupId,
  taskListId,
  taskId,
}: Keys & { taskId: number }) {
  return [...tasksQueryKey({ groupId, taskListId }), "task", taskId] as const;
}
