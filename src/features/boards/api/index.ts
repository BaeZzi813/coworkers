import { apiClient } from "@/services/client";
import {
  Article,
  GetArticleParams,
  GetArticleResponse,
} from "@/types/boards-article";
import {
  Comment,
  GetCommentResponse,
  PostComment,
  PostCommentBody,
} from "@/types/boards-comment";

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

export async function deleteArticleById(id: number) {
  const res = await apiClient.delete(`/articles/${id}`);
  return res.data;
}

export async function getCommentById(id: number, limit: number = 10) {
  const res = await apiClient.get<GetCommentResponse>(
    `/articles/${id}/comments`,
    { params: { limit } }
  );
  return res.data;
}

export async function postCommentById(id: number, body: PostCommentBody) {
  const res = await apiClient.post<PostComment>(
    `/articles/${id}/comments`,
    body
  );
  return res.data;
}

export async function patchCommentById(id: number, body: PostCommentBody) {
  const res = await apiClient.patch<Comment>(`comments/${id}`, body);
  return res.data;
}

export async function deleteCommentById(id: number) {
  const res = await apiClient.delete<Comment>(`comments/${id}`);
  return res.data;
}

export async function postLikeById(id: number) {
  const res = await apiClient.post<Article>(`/articles/${id}/like`);
  return res.data;
}

export async function deleteLikeById(id: number) {
  const res = await apiClient.delete<Article>(`/articles/${id}/like`);
  return res.data;
}
