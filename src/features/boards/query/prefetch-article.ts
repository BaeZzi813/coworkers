import { QueryClient } from "@tanstack/react-query";
import { getArticleById, getCommentById } from "../api";

export async function prefetchArticle(
  queryClient: QueryClient,
  { articleId }: { articleId: number }
) {
  await queryClient.prefetchQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId),
  });
}

export async function prefetchComment(
  queryClient: QueryClient,
  { articleId, limit = 10 }: { articleId: number; limit?: number }
) {
  await queryClient.prefetchQuery({
    queryKey: ["comment", articleId],
    queryFn: () => getCommentById(articleId, limit),
  });
}
