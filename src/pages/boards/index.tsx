import { FloatingButton } from "@/components/button";
import Icon from "@/components/icon";
import Pagination from "@/components/pagination/Pagination";
import Select, { SelectOption } from "@/components/select";
import { getArticle } from "@/features/boards/api";
import BestPost from "@/features/boards/BestPost";
import PostCard from "@/features/boards/PostCard";
import SearchBar from "@/features/boards/SearchBar";
import { useSidebarStore } from "@/stores/sidebar-store";
import { Article, GetArticleResponse } from "@/types/article";
import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import clsx from "clsx";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const options: SelectOption[] = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
];

const PAGE_SIZE = 6;

export default function BoardsPage() {
  const router = useRouter();
  const isSidebarFolded = useSidebarStore((state) => state.isFold);
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 300);
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    options[0]
  );
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { data } = useQuery<GetArticleResponse>({
    queryKey: ["articles", page, debounceQuery, selectedOption.value],
    queryFn: () =>
      getArticle({
        page,
        pageSize: PAGE_SIZE,
        orderBy: selectedOption.value as "recent" | "like",
        keyword: debounceQuery,
      }),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    const nextPage = page + 1;
    queryClient.prefetchQuery({
      queryKey: ["articles", nextPage, debounceQuery, selectedOption.value],
      queryFn: () =>
        getArticle({
          page: nextPage,
          pageSize: PAGE_SIZE,
          orderBy: selectedOption.value as "recent" | "like",
          keyword: debounceQuery,
        }),
    });
  }, [page, debounceQuery, selectedOption.value, queryClient]);

  console.log(data);

  const handleChange = (value: SelectOption) => {
    setSelectedOption(value);
  };

  const totalPages = Math.ceil((data?.totalCount ?? 0) / PAGE_SIZE);

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
            {data?.list.map((post: Article) => (
              <PostCard key={post.id} article={post} />
            ))}
          </div>
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
            className="mt-6"
          />
        </div>
        <div
          className={clsx(
            "fixed top-[800px] hidden desktop:block",
            isSidebarFolded
              ? "right-[calc((100vw-1024px)/2-130px)]"
              : "right-[calc((100vw-1024px)/2-130px-98px)]"
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
