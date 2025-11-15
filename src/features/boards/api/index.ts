import ArticleMock from "./article-mock.json";

interface Article {
  id: number;
  title: string;
  image?: string;
  likeCount: number;
  content?: string;
  writer: {
    id: number;
    nickname: string;
  };
  createdAt: string;
  updatedAt: string;
}

export async function getArticle(): Promise<{
  totalCount: number;
  list: Article[];
}> {
  return ArticleMock;
}
