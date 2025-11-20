import { getArticleById } from "@/features/boards/api";
import ArticleComment from "@/features/boards/article/ArticleComment";
import ArticleContent from "@/features/boards/article/ArticleContent";
import ArticleHeader from "@/features/boards/article/ArticleHeader";
import ArticleLikeButton from "@/features/boards/article/ArticleLikeButton";
import { formatDate } from "@/utils/format-date";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(Number(id)),
    enabled: !!id,
  });

  const formattedDate = formatDate(data?.createdAt ?? "");

  const articleDropdownOptions = [
    {
      label: "수정하기",
      value: "edit",
      action: () => router.push(`/boards/edit/${id}`),
    },
    {
      label: "삭제하기",
      value: "delete",
      action: () => alert("정말 삭제하시겠습니까?"),
    },
  ];

  return (
    <>
      <section className="min-h-screen w-full bg-background-secondary py-5 tablet:py-[68px]">
        <div className="relative mx-auto w-[343px] rounded-[20px] bg-background-primary tablet:w-[620px] desktop:w-[900px]">
          <div className="mx-auto w-[300px] pt-10 pb-10 tablet:w-[540px] tablet:pt-[54px] tablet:pb-[54px] desktop:w-[780px]">
            <ArticleHeader
              title={data?.title}
              articleDropdownOptions={articleDropdownOptions}
              nickname={data?.writer.nickname}
              formattedDate={formattedDate}
            />
            <ArticleContent content={data?.content} image={data?.image} />
            <ArticleLikeButton likeCount={data?.likeCount} />
            <ArticleComment
              commentCount={data?.commentCount}
              comment={data?.comment}
              articleDropdownOptions={articleDropdownOptions}
            />
          </div>
        </div>
      </section>
    </>
  );
}
