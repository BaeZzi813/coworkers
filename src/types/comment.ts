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
