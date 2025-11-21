import {
  deleteArticleById,
  deleteCommentById,
  getArticleById,
  getCommentById,
  patchCommentById,
  postCommentById,
} from "@/features/boards/api";
import ArticleComment from "@/features/boards/article/ArticleComment";
import ArticleContent from "@/features/boards/article/ArticleContent";
import ArticleHeader from "@/features/boards/article/ArticleHeader";
import ArticleLikeButton from "@/features/boards/article/ArticleLikeButton";
import { useAuthStore } from "@/stores/auth-store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();

  const { data: article } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(Number(id)),
    enabled: !!id,
  });

  const { data: comments } = useQuery({
    queryKey: ["comment", id],
    queryFn: () => getCommentById(Number(id)),
    enabled: !!id,
  });

  console.log(comments);

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

  const postCommentMutation = useMutation({
    mutationFn: (data: { id: number; content: string }) =>
      postCommentById(data.id, { content: data.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", id] });
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  const patchCommentMutation = useMutation({
    mutationFn: ({
      commentId,
      content,
    }: {
      commentId: number;
      content: string;
    }) => patchCommentById(commentId, { content }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["comment", id] }),
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteCommentById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
    onError: (error) => {
      console.log("삭제 실패:", error);
    },
  });

  const user = useAuthStore((state) => state.user);
  const userImage = user?.image;
  const userId = user?.id;

  return (
    <>
      <section className="min-h-screen w-full bg-background-secondary py-5 tablet:py-[68px]">
        <div className="relative mx-auto w-[343px] rounded-[20px] bg-background-primary tablet:w-[620px] desktop:w-[900px]">
          <div className="mx-auto w-[300px] pt-10 pb-10 tablet:w-[540px] tablet:pt-[54px] tablet:pb-[54px] desktop:w-[780px]">
            <ArticleHeader
              currentUserId={userId}
              article={article}
              userImage={userImage}
              deleteArticleMutation={deleteArticleMutation}
            />
            <ArticleContent article={article} />
            <ArticleLikeButton likeCount={article?.likeCount} />
            <ArticleComment
              id={Number(id)}
              commentCount={article?.commentCount}
              currentUserId={userId}
              comment={comments?.list ?? []}
              userImage={userImage}
              postCommentMutation={postCommentMutation}
              patchCommentMutation={patchCommentMutation}
              deleteCommentMutation={deleteCommentMutation}
            />
          </div>
        </div>
      </section>
    </>
  );
}
