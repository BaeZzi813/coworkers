export interface Article {
  id: number;
  title: string;
  image: string | null;
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
  isLiked?: boolean | null;
}
