import { Member } from "./member";
import { TaskList } from "./task";

export interface UserGroup {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
}

export interface Group {
  teamId: string;
  updatedAt: string;
  createdAt: string;
  image: string;
  name: string;
  id: number;
  members: Member[];
  taskLists: TaskList[];
}
