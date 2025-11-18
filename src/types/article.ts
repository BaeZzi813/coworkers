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
}
