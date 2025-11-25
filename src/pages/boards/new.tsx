import { postArticle, PostArticleBody } from "@/features/boards/api";
import PostForm from "@/features/boards/post-form/PostForm";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function New() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const postArticleMutation = useMutation({
    mutationFn: postArticle,
    onSuccess: () => {
      router.push("/boards");
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
  });

  const handleSubmit = async (data: PostArticleBody) => {
    await postArticleMutation.mutateAsync(data);
  };

  return <PostForm mode="post" onSubmit={handleSubmit} />;
}
