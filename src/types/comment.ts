export interface Comment {
  user: {
    image: string;
    nickname: string;
    id: number;
  };
  userId: number;
  taskId: number;
  updatedAt: string;
  createdAt: string;
  content: string;
  id: number;
}
