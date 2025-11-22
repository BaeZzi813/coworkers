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
  isLiked?: boolean;
}

export interface GetArticleResponse {
  totalCount: number;
  list: Article[];
}

export interface GetArticleParams {
  page: number;
  pageSize: number;
  orderBy: "recent" | "like";
  keyword?: string;
}
