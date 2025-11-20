import Dropdown from "@/components/dropdown";
import Icon from "@/components/icon";
import { formatDate } from "@/utils/format-date";
import Image from "next/image";

export default function ArticleComment({
  commentCount,
  comment,
  articleDropdownOptions,
}) {
  return (
    <>
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <div className="text-md-b tablet:text-2lg-b">댓글</div>
          <span className="text-md-b text-brand-primary tablet:text-2lg-b">
            {commentCount}
          </span>
        </div>
        <div className="flex items-center">
          <div>사진</div>
          <div className="flex h-12 flex-1 items-center justify-between border-t border-b border-border-primary">
            <input
              type="text"
              placeholder="댓글을 달아주세요"
              className="w-52 text-text-default placeholder:text-xs-r focus:outline-none tablet:w-[420px]"
            />
            <button className="flex h-6 w-6 items-center justify-center rounded-full bg-icon-primary">
              <Icon name="arrowUp" />
            </button>
          </div>
        </div>
      </div>
      {comment && comment.length > 0 ? (
        comment.map((article) => (
          <div
            key={article.id}
            className="border-t border-t-border-primary py-3 tablet:py-5"
          >
            <div className="flex h-[54px] gap-2">
              <div className="relative h-6 w-6 tablet:h-8 tablet:w-8">
                <Image
                  src={article.writer.image}
                  alt="댓글작성자 이미지"
                  fill
                  className="rounded-md"
                />
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex justify-between">
                  <div className="text-xs-s text-text-primary tablet:text-md-b">
                    {article.writer.nickname}
                  </div>
                  <button className="cursor-pointer">
                    <Dropdown
                      anchor={<Icon name="dots" size="small" />}
                      options={articleDropdownOptions}
                      direction="bottom"
                      alignment="right"
                    />
                  </button>
                </div>
                <div className="text-sm-m text-text-primary tablet:text-md-r">
                  {article.content}
                </div>
                <span className="text-xs-r text-slate-400 tablet:text-md-m">
                  {formatDate(article.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-[120px] items-center justify-center text-md-r text-text-default">
          아직 작성한 댓글이 없습니다.
        </div>
      )}
    </>
  );
}
