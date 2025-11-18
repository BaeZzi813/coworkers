import { Article } from "@/types/article";
import ArticleMock from "./article-mock.json";

export interface GetArticleResponse {
  totalCount: number;
  list: Article[];
}

export async function getArticle(): Promise<GetArticleResponse> {
  return ArticleMock;
}

export async function getArticleById(id: number): Promise<Article | undefined> {
  const article = ArticleMock.list.find((item) => item.id === id);
  return article;
}
