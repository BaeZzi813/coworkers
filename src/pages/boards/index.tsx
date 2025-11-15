import Select, { SelectOption } from "@/components/select";
import ArticleMock from "@/features/boards/api/article-mock.json";
import PostCard from "@/features/boards/PostCard";
import SearchBar from "@/features/boards/SearchBar";
import { useMemo, useState } from "react";

export default function BoardsPage() {
  const [query, setQuery] = useState("");
  const [selectedOption, setSelectedOption] = useState<SelectOption>();

  const options: SelectOption[] = [
    { label: "최신순", value: "recent" },
    { label: "좋아요순", value: "like" },
  ];

  const handleChange = (value: SelectOption) => {
    setSelectedOption(value);
  };

  const filterPost = useMemo(() => {
    let result = ArticleMock.list.filter((post) => {
      const lowerQuery = query.toLowerCase();
      return post.title.toLowerCase().includes(lowerQuery);
    });
    if (selectedOption?.value === "like") {
      result = result.sort((a, b) => b.likeCount - a.likeCount);
    } else if (selectedOption?.value === "recent") {
      result = result.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return result;
  }, [query, selectedOption]);

  const popularPost = useMemo(() => {
    return [...ArticleMock.list]
      .sort((a, b) => b.likeCount - a.likeCount)
      .slice(0, 4)
      .map((post) => post.id);
  }, []);

  return (
    <>
      <section className="border-t border-border-primary tablet:border-t-0">
        <div className="mx-auto mt-[25px] mb-5 w-[343px] tablet:mt-[77px] tablet:mb-[29px] tablet:w-[620px] desktop:mt-[87px] desktop:w-[1120px]">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </section>
      <section className="min-h-screen">
        <div className="mx-auto flex w-[340px] flex-col gap-5 tablet:w-[620px] desktop:w-[1120px]">
          <div className="flex items-center justify-end">
            <Select
              placeholder="최신순"
              size="large"
              options={options}
              onChange={handleChange}
              value={selectedOption}
              className="h-10 w-[94px] tablet:h-11 tablet:w-[120px]"
            />
          </div>
          <div className="flex flex-col gap-4 desktop:grid desktop:grid-cols-2 desktop:gap-5">
            {filterPost.map((post) => (
              <PostCard
                key={post.id}
                title={post.title}
                likeCount={post.likeCount}
                createdAt={post.createdAt}
                writer={post.writer}
                image={post.image}
                content={post.content}
                isPopular={popularPost.includes(post.id)}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
