import SearchBar from "@/features/boards/SearchBar";

export default function BoardsPage() {
  return (
    <>
      <section className="mt-[87px] ml-[89px] w-full">
        <div className="flex w-[1120px] flex-col">
          <SearchBar />
          <div>베스트 게시글</div>
        </div>
      </section>
    </>
  );
}
