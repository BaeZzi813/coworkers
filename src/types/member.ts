export interface Member {
  role: Role;
  userImage: string;
  userEmail: string;
  userName: string;
  groupId: number;
  userId: number;
}

export type Role = "ADMIN" | "MEMBER";
