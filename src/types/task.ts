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
  frequency: TaskFrequency;
  updatedAt: string;
  doneAt: string | null;
  date: string;
  description: string | null;
  name: string;
  id: number;
}

export interface TaskList {
  displayIndex: number;
  groupId: number;
  updatedAt: string;
  createdAt: string;
  name: string;
  id: number;
  tasks: Task[];
}

export type TaskFrequency = "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";

export interface TaskHistory {
  displayIndex: number;
  writerId: number;
  userId: number;
  deletedAt: string;
  frequency: TaskFrequency;
  description: string;
  name: string;
  recurringId: number;
  doneAt: string;
  date: string;
  updatedAt: string;
  id: number;
}
