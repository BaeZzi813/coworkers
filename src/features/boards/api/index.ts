import { apiClient } from "@/services/client";
import { Article, GetArticleParams, GetArticleResponse } from "@/types/article";

export async function getArticle(params: GetArticleParams) {
  const res = await apiClient.get<GetArticleResponse>("/articles", {
    params: params,
  });
  return res.data;
}

export async function getArticleById(id: number) {
  const res = await apiClient.get<Article>(`/articles/${id}`);
  return res.data;
}
