import Icon from "@/components/icon";
import { getArticleById } from "@/features/boards/api";
import { useResponsive } from "@/hooks/use-responsive";
import { formatDate } from "@/utils/format-date";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";

export default function ArticlePage() {
  const router = useRouter();
  const { id } = router.query;
  const { isDesktop, isTablet, isMobile } = useResponsive();

  const { data } = useQuery({
    queryKey: ["article", id],
    queryFn: () => getArticleById(Number(id)),
    enabled: !!id,
  });

  const formattedDate = formatDate(data?.createdAt ?? "");

  return (
    <>
      <section className="min-h-screen w-full bg-background-secondary py-5 tablet:py-[68px]">
        <div className="relative mx-auto w-[343px] rounded-[20px] bg-background-primary tablet:w-[620px] desktop:w-[900px]">
          <div className="mx-auto w-[300px] pt-10 pb-10 tablet:w-[540px] tablet:pt-[54px] tablet:pb-[54px] desktop:w-[780px]">
            <div className="flex h-[68px] flex-col gap-2 border-b border-b-border-primary tablet:h-[76px]">
              <div className="flex justify-between">
                <div className="text-2lg-b tablet:text-xl-b">{data?.title}</div>
                <Icon name="dots" />
              </div>
              <div>
                <span className="text-xs-m text-text-primary tablet:text-md-m">
                  {data?.writer.nickname}
                </span>
                <div className="mx-2 inline-block h-3 -translate-y-[0.05rem] border-l border-slate-700 align-middle" />
                <span className="text-xs-m text-slate-400 tablet:text-md-m">
                  {formattedDate}
                </span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-6">
              <div className="text-md-r text-text-primary tablet:text-lg-r">
                {data?.content}
              </div>
              {data?.image && (
                <div className="relative h-[140px] w-[140px] tablet:h-[200px] tablet:w-[200px]">
                  <Image
                    src={data?.image}
                    fill
                    alt="게시글 이미지"
                    className="rounded-xl"
                  />
                </div>
              )}
            </div>
            {isDesktop ? (
              <div className="h-10">
                <div className="absolute top-44 -right-20 flex flex-col items-center gap-2">
                  <button className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-background-inverse">
                    <Icon name="heart" color="white" />
                  </button>
                  <span className="text-lg-r text-state-400">
                    {data?.likeCount}
                  </span>
                </div>
              </div>
            ) : (
              <span className="flex h-[49px] items-center justify-end text-md-r text-slate-400 tablet:h-20 tablet:text-lg-r">
                <button className="mr-1 inline-block cursor-pointer">
                  {isMobile ? (
                    <Icon name="heart" size="small" color="white" />
                  ) : (
                    <Icon name="heart" size="large" color="white" />
                  )}
                </button>
                {data?.likeCount}
              </span>
            )}
            <div className="mb-5 flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <div className="text-md-b tablet:text-2lg-b">댓글</div>
                <span className="text-md-b text-brand-primary tablet:text-2lg-b">
                  {data?.commentCount}
                </span>
              </div>
              <div className="flex items-center">
                <div>사진</div>
                <div className="flex h-12 flex-1 items-center justify-between border-t border-b border-border-primary">
                  <input
                    type="text"
                    placeholder="댓글을 달아주세요"
                    className="w-52 text-text-default placeholder:text-xs-r focus:outline-none tablet:w-[420px]"
                  />
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-icon-primary">
                    <Icon name="arrowUp" />
                  </button>
                </div>
              </div>
            </div>
            {data?.comment &&
              data.comment.map((article) => (
                <div
                  key={article.id}
                  className="border-t border-t-border-primary py-3 tablet:py-5"
                >
                  <div className="flex h-[54px] gap-2">
                    <div className="relative h-6 w-6 tablet:h-8 tablet:w-8">
                      <Image
                        src={article.writer.image}
                        alt="댓글작성자 이미지"
                        fill
                        className="rounded-md"
                      />
                    </div>
                    <div className="flex w-full flex-col gap-1">
                      <div className="flex justify-between">
                        <div className="text-xs-s text-text-primary tablet:text-md-b">
                          {article.writer.nickname}
                        </div>
                        <Icon name="dots" size="small" />
                      </div>
                      <div className="text-sm-m text-text-primary tablet:text-md-r">
                        {article.content}
                      </div>
                      <span className="text-xs-r text-slate-400 tablet:text-md-m">
                        {formatDate(article.createdAt)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
