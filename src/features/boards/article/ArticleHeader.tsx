import AvatarSM from "@/assets/images/avatar-placeholder-sm.svg";
import Dropdown from "@/components/dropdown";
import Icon from "@/components/icon";
import Image from "next/image";

export default function ArticleHeader({
  title,
  articleDropdownOptions,
  nickname,
  formattedDate,
  userImage,
  currentUserId,
  writerId,
}) {
  return (
    <div className="flex h-[68px] flex-col gap-2 border-b border-b-border-primary tablet:h-[76px]">
      <div className="flex justify-between">
        <div className="line-clamp-1 text-2lg-b tablet:text-xl-b">{title}</div>
        {writerId === currentUserId && (
          <button className="cursor-pointer">
            <Dropdown
              anchor={<Icon name="dots" />}
              options={articleDropdownOptions}
              direction="bottom"
              alignment="right"
            />
          </button>
        )}
      </div>
      <div className="flex h-9 items-center gap-2">
        <div>
          {userImage ? (
            <Image src={userImage} alt="유저 이미지" width={24} height={24} />
          ) : (
            <AvatarSM className="h-6 w-6" />
          )}
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
    </div>
  );
}
