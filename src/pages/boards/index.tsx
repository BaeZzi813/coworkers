import SearchBar from "@/features/boards/SearchBar";
import { useState } from "react";

export default function BoardsPage() {
  const [query, setQuery] = useState("");
  return (
    <>
      <section className="mx-auto w-[375px] tablet:w-2xl desktop:ml-[87px]">
        <div className="h-[137px] w-[375px] tablet:h-[162px] tablet:w-2xl desktop:h-[173px]">
          <SearchBar value={query} onChange={setQuery} />
        </div>
      </section>
      <div>베스트 게시글</div>
    </>
  );
}
