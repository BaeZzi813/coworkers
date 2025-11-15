import { Article } from "@/types/article";
import ArticleMock from "./article-mock.json";

export async function getArticle(): Promise<Article[]> {
  return ArticleMock.list;
}
