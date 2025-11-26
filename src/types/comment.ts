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

export interface ArticleCommentWriter {
  id: number;
  nickname: string;
  image: string;
}

export interface ArticleComment {
  id: number;
  content: string;
  writer: ArticleCommentWriter;
  createdAt: string;
  updatedAt: string;
}
