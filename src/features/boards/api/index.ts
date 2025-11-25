import { clientApiInstance } from "@/services/instance/client";
import { Article } from "@/types/article";
import { ArticleComment } from "@/types/comment";

interface GetArticleResponse {
  totalCount: number;
  list: Article[];
}

interface GetArticleParams {
  page: number;
  pageSize: number;
  orderBy: "recent" | "like";
  keyword?: string;
}

export interface GetCommentResponse {
  nextCursor: number;
  list: ArticleComment[];
}

export interface PostComment {
  id: number;
  content: string;
}

interface PostCommentBody {
  content: string;
}

export interface PostArticleBody {
  image?: string;
  content: string;
  title: string;
}

export async function getArticle(params: GetArticleParams) {
  const res = await clientApiInstance.get<GetArticleResponse>("/articles", {
    params: params,
  });
  return res.data;
}

export async function getArticleById(id: number) {
  const res = await clientApiInstance.get<Article>(`/articles/${id}`);
  return res.data;
}

export async function deleteArticleById(id: number) {
  const res = await clientApiInstance.delete(`/articles/${id}`);
  return res.data;
}

export async function getCommentById(id: number, limit: number = 10) {
  const res = await clientApiInstance.get<GetCommentResponse>(
    `/articles/${id}/comments`,
    { params: { limit } }
  );
  return res.data;
}

export async function postCommentById(id: number, body: PostCommentBody) {
  const res = await clientApiInstance.post<PostComment>(
    `/articles/${id}/comments`,
    body
  );
  return res.data;
}

export async function patchCommentById(id: number, body: PostCommentBody) {
  const res = await clientApiInstance.patch<ArticleComment>(
    `comments/${id}`,
    body
  );
  return res.data;
}

export async function deleteCommentById(id: number) {
  const res = await clientApiInstance.delete<ArticleComment>(`comments/${id}`);
  return res.data;
}

export async function postLikeById(id: number) {
  const res = await clientApiInstance.post<Article>(`/articles/${id}/like`);
  return res.data;
}

export async function deleteLikeById(id: number) {
  const res = await clientApiInstance.delete<Article>(`/articles/${id}/like`);
  return res.data;
}

export async function postArticle(body: PostArticleBody) {
  const res = await clientApiInstance.post<PostArticleBody>("/articles", body);
  return res.data;
}

export async function postImage(formData: FormData) {
  const res = await clientApiInstance.post("/images/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data;
}

export async function patchArticleById(id: number, body: PostArticleBody) {
  const res = await clientApiInstance.patch(`/articles/${id}`, body);
  return res.data;
}
