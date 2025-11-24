import { Article } from "@/types/article";
import Image from "next/image";

export default function ArticleContent({ article }: { article?: Article }) {
  return (
    <div className="mt-4 flex flex-col gap-6">
      <div className="text-md-r text-text-primary tablet:text-lg-r">
        {article?.content}
      </div>
      {article?.image && (
        <div className="relative h-[140px] w-[140px] tablet:h-[200px] tablet:w-[200px]">
          <Image
            src={article?.image}
            fill
            alt="게시글 이미지"
            className="rounded-xl"
          />
        </div>
      )}
    </div>
  );
}
