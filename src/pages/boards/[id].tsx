import { Button } from "@/components/button";
import { Alert } from "@/components/modal";
import {
  deleteArticleById,
  getArticleById,
  getCommentById,
} from "@/features/boards/api";
import ArticleComment from "@/features/boards/article/ArticleComment";
import ArticleContent from "@/features/boards/article/ArticleContent";
import ArticleHeader from "@/features/boards/article/ArticleHeader";
import ArticleLikeButton from "@/features/boards/article/ArticleLikeButton";
import { useAuthStore } from "@/stores/auth-store";
import { formatDate } from "@/utils/format-date";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";

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

  const deleteMutation = useMutation({
    mutationFn: (id: number) => deleteArticleById(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      router.push("/boards");
    },
    onError: (error) => {
      console.log("삭제 실패:", error);
    },
  });

  const formattedDate = formatDate(article?.createdAt ?? "");

  const articleDropdownOptions = [
    {
      label: "수정하기",
      value: "edit",
      action: () => router.push(`/boards/edit/${id}`),
    },
    {
      label: "삭제하기",
      value: "delete",
      action: () => {
        overlay.open(
          ({ isOpen, close, unmount }) => (
            <Alert
              isOpen={isOpen}
              onClose={close}
              onExit={unmount}
              title="게시글을 삭제하시겠어요?"
              message={`삭제된 게시글은 다시 복구할 수 없습니다.`}
              actions={[
                <Button
                  key="alert-close"
                  variant="outlinedSecondary"
                  title="닫기"
                  onClick={close}
                />,
                <Button
                  key="alert-action"
                  variant="danger"
                  title="삭제"
                  onClick={() => {
                    deleteMutation.mutate(Number(id), {
                      onSuccess: () => close(),
                    });
                  }}
                />,
              ]}
            />
          ),
          { overlayId: "delete-article-alert" }
        );
      },
    },
  ];

  const user = useAuthStore((state) => state.user);
  const userImage = user?.image;
  const userId = user?.id;

  console.log("글쓴이 아이디", article?.writer.id);
  console.log("접속자 아이디", userId);
  return (
    <>
      <section className="min-h-screen w-full bg-background-secondary py-5 tablet:py-[68px]">
        <div className="relative mx-auto w-[343px] rounded-[20px] bg-background-primary tablet:w-[620px] desktop:w-[900px]">
          <div className="mx-auto w-[300px] pt-10 pb-10 tablet:w-[540px] tablet:pt-[54px] tablet:pb-[54px] desktop:w-[780px]">
            <ArticleHeader
              currentUserId={userId}
              writerId={article?.writer.id}
              title={article?.title}
              articleDropdownOptions={articleDropdownOptions}
              nickname={article?.writer.nickname}
              formattedDate={formattedDate}
              userImage={userImage}
            />
            <ArticleContent content={article?.content} image={article?.image} />
            <ArticleLikeButton likeCount={article?.likeCount} />
            <ArticleComment
              id={id}
              commentCount={article?.commentCount}
              currentUserId={userId}
              comment={comments?.list ?? []}
              articleDropdownOptions={articleDropdownOptions}
              userImage={userImage}
            />
          </div>
        </div>
      </section>
    </>
  );
}
