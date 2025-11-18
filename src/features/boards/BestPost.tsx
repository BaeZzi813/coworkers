import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import { Article } from "@/types/article";
import clsx from "clsx";
import { useMemo, useState } from "react";
import PostCard from "./PostCard";

interface BestPostProps {
  article: Article[];
}

export default function BestPost({ article = [] }: BestPostProps) {
  const { isTablet, isDesktop } = useResponsive();
  const cardPerPage = isDesktop ? 3 : isTablet ? 2 : 1;

  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(article.length / cardPerPage);

  const safePage = page >= totalPages ? Math.max(totalPages - 1, 0) : page;

  const visiblePage = useMemo(() => {
    const start = safePage * cardPerPage;
    return article.slice(start, start + cardPerPage) ?? [];
  }, [article, safePage, cardPerPage]);

  const hasPrev = page > 0;
  const hasNext = page < totalPages - 1;

  return (
    <section className="mx-auto">
      <div className="h-[314px] w-full bg-background-secondary tablet:h-[326px] desktop:mx-auto desktop:h-[370px] desktop:w-[1120px] desktop:rounded-[20px]">
        <div className="mx-auto flex h-[218px] w-[340px] flex-col gap-5 pt-[27px] tablet:h-[221px] tablet:w-[620px] desktop:w-[1074px]">
          <h1 className="text-2lg-b tablet:text-xl-b">베스트 게시글</h1>

          <div className="flex gap-3">
            {visiblePage.map((post) => (
              <PostCard key={post.id} article={post} isPopular={true} />
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex flex-1 justify-center gap-1.5">
              {Array.from({ length: totalPages }).map((_, idx) => {
                const isActive = idx === safePage;
                return (
                  <button
                    key={idx}
                    onClick={() => setPage(idx)}
                    className={clsx(
                      "h-2 cursor-pointer rounded-full",
                      isActive ? "w-4 bg-slate-400" : "w-2 bg-slate-300"
                    )}
                  />
                );
              })}
            </div>
            <div className="flex gap-1">
              <button
                disabled={!hasPrev}
                onClick={() => setPage((p) => p - 1)}
                className={clsx(
                  "flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-background-primary",
                  hasPrev && "cursor-pointer"
                )}
              >
                <Icon name="chevronLeft" size="small" color="white" />
              </button>
              <button
                disabled={!hasNext}
                onClick={() => setPage((p) => p + 1)}
                className={clsx(
                  "flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-background-primary",
                  hasNext && "cursor-pointer"
                )}
              >
                <Icon name="chevronRight" size="small" color="white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
