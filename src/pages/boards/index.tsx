import Select, { SelectOption } from "@/components/select";
import { getArticle, MockResponse } from "@/features/boards/api";
import BestPost from "@/features/boards/BestPost";
import PostCard from "@/features/boards/PostCard";
import SearchBar from "@/features/boards/SearchBar";
import { Article } from "@/types/article";
import { useQuery } from "@tanstack/react-query";
import { useDebounce } from "@uidotdev/usehooks";
import { useState } from "react";

const options: SelectOption[] = [
  { label: "최신순", value: "recent" },
  { label: "좋아요순", value: "like" },
];

export default function BoardsPage() {
  const [query, setQuery] = useState("");
  const debounceQuery = useDebounce(query, 300);
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    options[0]
  );

  const { data } = useQuery<MockResponse>({
    queryKey: ["article"],
    queryFn: getArticle,
    placeholderData: { totalCount: 0, list: [] },
  });

  const { data: filterPost = [] } = useQuery<Article[]>({
    queryKey: ["filterPost", data?.list, debounceQuery, selectedOption.value],
    queryFn: () => {
      if (!data?.list) return [];
      let result = data.list.filter((post) =>
        post.title.toLowerCase().includes(debounceQuery.toLowerCase())
      );
      if (selectedOption.value === "like") {
        result = result.sort((a, b) => b.likeCount - a.likeCount);
      } else {
        result = result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      }
      return result;
    },
  });

  const bestPosts = [...(data?.list ?? [])].sort(
    (a, b) => b.likeCount - a.likeCount
  );

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
      {bestPosts.length > 0 && <BestPost article={bestPosts} />}
      <section className="min-h-screen">
        <div className="mx-auto mt-7 flex w-[340px] flex-col gap-5 tablet:w-[620px] desktop:w-[1120px]">
          <div className="flex items-center justify-between">
            <h1 className="text-2lg-b tablet:text-xl-b">전체</h1>
            <Select
              size="large"
              options={options}
              onChange={handleChange}
              value={selectedOption}
              className="h-10 w-[94px] tablet:h-11 tablet:w-[120px]"
            />
          </div>
          <div className="flex flex-col gap-4 desktop:grid desktop:grid-cols-2 desktop:gap-5">
            {filterPost.map((post) => (
              <PostCard key={post.id} article={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
