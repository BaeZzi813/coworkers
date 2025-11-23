export interface CommentWriter {
  id: number;
  nickname: string;
  image: string;
}

export interface Comment {
  id: number;
  content: string;
  writer: CommentWriter;
  createdAt: string;
  updatedAt: string;
}
