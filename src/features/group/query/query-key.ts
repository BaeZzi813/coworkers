interface Keys {
  groupId?: number;
}

export function groupsQueryKey({ groupId }: Keys = {}) {
  if (groupId) {
    return ["groups", groupId] as const;
  }

  return ["groups"] as const;
}
