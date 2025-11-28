import {
  deleteCommentById,
  deleteLikeById,
  getArticleById,
  getCommentById,
  patchCommentById,
  postCommentById,
  postLikeById,
} from "@/features/boards/api";
import { GetCommentResponse } from "@/features/boards/api/index";
import ArticleComment from "@/features/boards/article/ArticleComment";
import ArticleContent from "@/features/boards/article/ArticleContent";
import ArticleHeader from "@/features/boards/article/ArticleHeader";
import ArticleLikeButton from "@/features/boards/article/ArticleLikeButton";
import { useAuthStore } from "@/stores/auth-store";
import { Article } from "@/types/article";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const queryClient = useQueryClient();
  const articleId = Number(id);

  const user = useAuthStore((state) => state.user);
  const userImage = user?.image;
  const userId = user?.id;

  const { data: article, isLoading } = useQuery({
    queryKey: ["article", articleId],
    queryFn: () => getArticleById(articleId),
    enabled: !!user,
    refetchOnMount: "always",
  });

  const { data: comments } = useQuery({
    queryKey: ["comment", articleId],
    queryFn: () => getCommentById(articleId),
    enabled: !!articleId,
  });

  const postCommentMutation = useMutation({
    mutationFn: (data: { id: number; content: string }) =>
      postCommentById(articleId, { content: data.content }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", articleId] });
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
    onMutate: async ({ commentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ["comment", articleId] });
      const prevComment = queryClient.getQueryData<GetCommentResponse>([
        "comment",
        articleId,
      ]);
      if (prevComment) {
        queryClient.setQueryData<GetCommentResponse>(["comment", id], {
          ...prevComment,
          list: prevComment.list.map((comment) =>
            comment.id === commentId ? { ...comment, content } : comment
          ),
        });
      }
      return { prevComment };
    },
    onError: (_error, _variables, context) => {
      if (context?.prevComment) {
        queryClient.setQueryData(["comment", articleId], context.prevComment);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", articleId] });
    },
  });

  const deleteCommentMutation = useMutation({
    mutationFn: (id: number) => deleteCommentById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comment", articleId] });
    },
    onError: (error) => {
      console.log("삭제 실패:", error);
    },
  });

  const likeMutation = useMutation({
    mutationFn: async ({
      articleId,
      isLiked,
    }: {
      articleId: number;
      isLiked: boolean | null;
    }) => (isLiked ? deleteLikeById(articleId) : postLikeById(articleId)),
    onMutate: async ({ isLiked }) => {
      await queryClient.cancelQueries({ queryKey: ["article", articleId] });
      const prevArticle = queryClient.getQueryData<Article>([
        "article",
        articleId,
      ]);
      if (prevArticle) {
        queryClient.setQueryData<Article>(["article", articleId], {
          ...prevArticle,
          isLiked: !isLiked,
          likeCount: isLiked
            ? prevArticle.likeCount - 1
            : prevArticle.likeCount + 1,
        });
      }
      return { prevArticle };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
    },
    onError: (_error, _variables, context) => {
      if (context?.prevArticle) {
        queryClient.setQueryData(["article", articleId], context.prevArticle);
      }
    },
  });

  const handleToggleLike = () => {
    if (!article) return;
    if (article.isLiked === null) {
      router.push("/login");
      return;
    }
    likeMutation.mutate({
      articleId,
      isLiked: article.isLiked ?? false,
    });
  };

  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <div>Loading...</div>;
      </section>
    );
  }

  if (!article) {
    return (
      <section className="flex min-h-screen items-center justify-center">
        <div>존재하지 않는 게시글입니다.</div>;
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full bg-background-secondary py-5 tablet:py-[68px]">
      <div className="relative mx-auto w-[343px] rounded-[20px] bg-background-primary tablet:w-[620px] desktop:w-[900px]">
        <div className="mx-auto w-[300px] pt-10 pb-10 tablet:w-[540px] tablet:pt-[54px] tablet:pb-[54px] desktop:w-[780px]">
          <ArticleHeader
            currentUserId={userId}
            article={article}
            userImage={userImage}
          />
          <ArticleContent article={article} />
          <ArticleLikeButton
            likeCount={article?.likeCount}
            isLiked={article?.isLiked ?? false}
            onToggle={handleToggleLike}
          />
          <ArticleComment
            id={articleId}
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
  );
}
