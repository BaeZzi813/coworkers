export interface Comment {
  id: number;
  content: string;
  writer: {
    id: number;
    nickname: string;
    image: string;
  };
  createdAt: string;
  updateAt: string;
}

export interface Article {
  id: number;
  title: string;
  image: string;
  likeCount: number;
  content: string;
  writer: {
    id: number;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
  commentCount?: number;
  comment?: Comment[];
}
