import Pagination from "@/components/pagination/Pagination";
import { useResponsive } from "@/hooks/use-responsive";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getArticle } from "./api";
import PostCard from "./PostCard";

export default function BestPost() {
  const { isTablet, isDesktop } = useResponsive();
  const cardPerPage = isDesktop ? 3 : isTablet ? 2 : 1;
  const [page, setPage] = useState(1);

  const { data } = useQuery({
    queryKey: ["bestPosts"],
    queryFn: () => getArticle({ page: 1, pageSize: 12, orderBy: "like" }),
  });

  const article = useMemo(() => data?.list ?? [], [data]);
  const totalPages = Math.ceil(article.length / cardPerPage);
  const safePage = page > totalPages ? Math.max(totalPages, 1) : page;

  const visiblePage = useMemo(() => {
    const start = (safePage - 1) * cardPerPage;
    return article.slice(start, start + cardPerPage);
  }, [article, safePage, cardPerPage]);

  return (
    <section className="mx-auto">
      <div className="h-[314px] w-full bg-background-secondary tablet:h-[326px] desktop:mx-auto desktop:h-[370px] desktop:w-[1120px] desktop:rounded-[20px]">
        <div className="mx-auto flex h-[218px] w-[340px] flex-col gap-5 pt-[27px] tablet:h-[221px] tablet:w-[620px] desktop:w-[1074px]">
          <h1 className="text-2lg-b tablet:text-xl-b">베스트 게시글</h1>

          <div className="flex gap-3">
            {visiblePage?.map((post) => (
              <PostCard key={post.id} article={post} isPopular={true} />
            ))}
          </div>
          <Pagination
            page={safePage}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        </div>
      </div>
    </section>
  );
}
