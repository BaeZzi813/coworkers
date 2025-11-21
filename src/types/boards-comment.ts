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

export interface GetCommentResponse {
  nextCursor: number;
  list: Comment[];
}

export interface PostComment {
  id: number;
  content: string;
}

export interface PostCommentBody {
  content: string;
}
