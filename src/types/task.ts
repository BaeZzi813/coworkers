interface TaskUser {
  image: string | null;
  nickname: string;
  id: number;
}

export interface Task {
  doneBy: {
    user: TaskUser;
  } | null;
  writer: TaskUser;
  displayIndex: number;
  commentCount: number;
  deletedAt: string | null;
  recurringId: number;
  frequency: "ONCE" | "DAILY" | "MONTHLY" | "WEEKLY";
  updatedAt: string;
  doneAt: string | null;
  date: string;
  description: string | null;
  name: string;
  id: number;
}

export interface TaskGroup {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
}
