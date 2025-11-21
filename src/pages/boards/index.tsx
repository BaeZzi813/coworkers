import { FloatingButton } from "@/components/button";
import Icon from "@/components/icon";
import Select, { SelectOption } from "@/components/select";
import { getArticle } from "@/features/boards/api";
import BestPost from "@/features/boards/BestPost";
import PostCard from "@/features/boards/PostCard";
import SearchBar from "@/features/boards/SearchBar";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Article } from "@/types/boards-article";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

const PAGE_SIZE = 8;

const options: SelectOption[] = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
];

export default function BoardsPage() {
  const router = useRouter();
  const isSidebarFolded = useSidebarStore((state) => state.isFold);
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 300);
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    options[0]
  );

  const observerRef = useRef<HTMLDivElement>(null);

  const { data, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ["articles", debounceQuery, selectedOption.value],
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getArticle({
        page: pageParam,
        pageSize: PAGE_SIZE,
        orderBy: selectedOption.value as "recent" | "like",
        keyword: debounceQuery,
      }),
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.length * PAGE_SIZE;
      if (loaded >= lastPage.totalCount) return undefined;
      return allPages.length + 1;
    },
  });

  useEffect(() => {
    if (!observerRef.current) return;
    if (!hasNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [hasNextPage, fetchNextPage]);

  const handleChange = (value: SelectOption) => {
    setSelectedOption(value);
  };

  return (
    <>
      <section className="border-t border-border-primary tablet:border-t-0">
        <div className="mx-auto mt-[25px] mb-5 w-[343px] tablet:mt-[77px] tablet:mb-[29px] tablet:w-[620px] desktop:mt-[87px] desktop:w-[1120px]">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </section>
      <BestPost />
      <section className="min-h-screen">
        <div className="relative mx-auto mt-7 flex w-[340px] flex-col gap-5 tablet:w-[620px] desktop:w-[1074px]">
          <div className="flex items-center justify-between">
            <h2 className="text-2lg-b tablet:text-xl-b">전체</h2>
            <Select
              size="large"
              options={options}
              onChange={handleChange}
              value={selectedOption}
              className="h-10 w-[94px] tablet:h-11 tablet:w-[120px]"
            />
          </div>
          <div className="flex flex-col gap-4 desktop:grid desktop:grid-cols-2 desktop:gap-5">
            {data?.pages
              ?.flatMap((page) => page.list)
              .map((post: Article) => (
                <PostCard key={post.id} article={post} />
              ))}
          </div>
        </div>
        <div ref={observerRef} className="h-10" />
        <div
          className={clsx(
            "fixed",
            "right-6 bottom-6",
            "desktop:top-[800px]",
            isSidebarFolded
              ? "desktop:right-[calc((100vw-1024px)/2-130px)]"
              : "desktop:right-[calc((100vw-1024px)/2-130px-98px)]"
          )}
        >
          <FloatingButton
            icon={<Icon name="pencil" />}
            onClick={() => router.push("/boards/new")}
          />
        </div>
      </section>
    </>
  );
}
