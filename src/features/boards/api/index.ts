import { apiClient } from "@/services/client";
import { Article, GetArticleParams, GetArticleResponse } from "@/types/article";
import ArticleMock from "./article-mock.json";

export async function getArticle(params: GetArticleParams) {
  const res = await apiClient.get<GetArticleResponse>("/articles", {
    params: params,
  });
  return res.data;
}

export async function getArticleById(id: number): Promise<Article | undefined> {
  const article = ArticleMock.list.find((item) => item.id === id);
  return article;
}
