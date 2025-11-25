import {
  getArticleById,
  patchArticleById,
  PostArticleBody,
} from "@/features/boards/api";
import PostForm from "@/features/boards/post-form/PostForm";
import { Article } from "@/types/article";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const articleId = Number(id);

  const { data, isLoading } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId),
    enabled: !!articleId,
    placeholderData: queryClient.getQueryData<Article>(["article", articleId]),
  });

  const patchArticleMutation = useMutation({
    mutationFn: (data: { title: string; content: string; image?: string }) =>
      patchArticleById(articleId, data),
    onSuccess: () => {
      router.push("/boards");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const handleSubmit = async (data: PostArticleBody) => {
    await patchArticleMutation.mutateAsync(data);
  };

  if (!data || isLoading) return <div>Loading...</div>;

  return <PostForm mode="edit" initialData={data} onSubmit={handleSubmit} />;
}
