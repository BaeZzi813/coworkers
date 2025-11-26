import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import Image from "next/image";

export default function PostImage({ preview, onChange, onDelete }) {
  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col gap-2 tablet:gap-3">
      <span className="text-md-b tablet:text-lg-b">이미지</span>
      <div className="flex gap-3">
        <label className="flex h-20 w-20 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-border-primary hover:bg-slate-100 tablet:h-[120px] tablet:w-[120px]">
          <Icon
            name="plus"
            color="#9ca3af"
            size={isMobile ? "medium" : "large"}
          />
          <span className="text-xs-m text-text-default tablet:text-md-m">
            이미지 등록
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        </label>
        {preview && (
          <div className="relative h-20 w-20 tablet:h-[120px] tablet:w-[120px]">
            <Image
              src={preview}
              alt="게시글 이미지"
              fill
              className="rounded-xl object-cover"
            />
            <button
              onClick={onDelete}
              className="absolute -top-1.5 -right-1.5 flex h-5 w-5 cursor-pointer items-center justify-center rounded-full border border-border-secondary bg-background-primary tablet:h-6 tablet:w-6"
            >
              <Icon name="xmark" size={isMobile ? "small" : "medium"} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
