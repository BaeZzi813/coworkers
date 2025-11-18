import { Article } from "@/types/article";
import ArticleMock from "./article-mock.json";

export interface GetArticleResponse {
  totalCount: number;
  list: Article[];
}

export async function getArticle(): Promise<GetArticleResponse> {
  return ArticleMock;
}
