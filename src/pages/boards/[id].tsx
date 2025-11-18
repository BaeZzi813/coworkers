import Icon from "@/components/icon";
import { getArticleById } from "@/features/boards/api";
import { formatDate } from "@/utils/format-date";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
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

  return (
    <>
      <section className="min-h-screen w-full bg-background-secondary pt-5">
        <div className="mx-auto h-[731px] w-[343px] bg-background-primary tablet:h-[989px] tablet:w-[620px]">
          <div className="mx-auto h-[652px] w-[300px] pt-[39px] tablet:w-[540px]">
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
            <div className="mt-4 flex h-[270px] flex-col gap-6">
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
            <span className="flex h-[49px] items-center justify-end text-md-r text-slate-400 tablet:h-[80px] tablet:text-lg-r">
              <span className="mr-1 inline-block">
                <Icon name="heart" size="small" color="white" />
              </span>
              {data?.likeCount}
            </span>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-1">
                <div className="text-md-b tablet:text-2lg-b">댓글</div>
                <span className="text-md-b text-brand-primary tablet:text-2lg-b">
                  2
                </span>
              </div>
              <div className="flex items-center">
                <div>사진</div>
                <div className="flex h-12 flex-1 items-center justify-between border-t border-b border-border-primary">
                  <input
                    type="text"
                    placeholder="댓글을 달아주세요"
                    className="w-52 focus:outline-none tablet:w-[420px]"
                  />
                  <button className="flex h-6 w-6 items-center justify-center rounded-full bg-icon-primary">
                    <Icon name="arrowUp" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
