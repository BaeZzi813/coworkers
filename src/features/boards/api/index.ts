import { Article } from "@/types/article";
import ArticleMock from "./article-mock.json";

export interface MockResponse {
  totalCount: number;
  list: Article[];
}

export async function getArticle(): Promise<MockResponse> {
  return ArticleMock;
}
