import Dropdown from "@/components/dropdown";
import Icon from "@/components/icon";
import { Article } from "@/types/article";

export default function ArticleHeader({
  title,
  articleDropdownOptions,
  nickname,
  formattedDate,
}) {
  return (
    <div className="flex h-[68px] flex-col gap-2 border-b border-b-border-primary tablet:h-[76px]">
      <div className="flex justify-between">
        <div className="line-clamp-1 text-2lg-b tablet:text-xl-b">{title}</div>
        <button className="cursor-pointer">
          <Dropdown
            anchor={<Icon name="dots" />}
            options={articleDropdownOptions}
            direction="bottom"
            alignment="right"
          />
        </button>
      </div>
      <div>
        <span className="text-xs-m text-text-primary tablet:text-md-m">
          {nickname}
        </span>
        <div className="mx-2 inline-block h-3 -translate-y-[0.05rem] border-l border-slate-700 align-middle" />
        <span className="text-xs-m text-slate-400 tablet:text-md-m">
          {formattedDate}
        </span>
      </div>
    </div>
  );
}
