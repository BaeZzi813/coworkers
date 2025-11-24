import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { deleteArticleById } from "../api";

export function useDeleteArticleMutation(id: number) {
  const queryClient = useQueryClient();
  const router = useRouter();

  const deleteArticleMutation = useMutation({
    mutationFn: (id: number) => deleteArticleById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.push("/boards");
    },
    onError: (error) => {
      console.log("삭제 실패:", error);
    },
  });

  return { deleteArticleMutation };
}
