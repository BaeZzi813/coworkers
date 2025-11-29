import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import Image from "next/image";
import { ChangeEventHandler } from "react";

interface Props {
  preview: string | null;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onDelete: () => void;
}

export default function PostImage({ preview, onChange, onDelete }: Props) {
  const { isMobile } = useResponsive();

  return (
    <div className="flex flex-col gap-2 tablet:gap-3">
      <span className="text-md-b tablet:text-lg-b">이미지</span>
      {preview ? (
        <div className="relative h-40 w-40 tablet:h-60 tablet:w-60">
          <Image
            src={preview}
            alt="게시글 이미지"
            fill
            className="object-covers inset-0 rounded-xl"
          />
          <div className="absolute inset-0 rounded-xl bg-black opacity-40" />
          <button
            onClick={onDelete}
            className="absolute top-1/2 left-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
          >
            <Icon
              name="xmark"
              size={isMobile ? "medium" : "large"}
              color="white"
            />
          </button>
        </div>
      ) : (
        <label className="flex h-40 w-40 cursor-pointer flex-col items-center justify-center gap-1 rounded-xl border border-border-primary hover:bg-slate-100 tablet:h-60 tablet:w-60">
          <Icon
            name="plus"
            color="#9ca3af"
            size={isMobile ? "medium" : "large"}
          />
          <span className="text-md-r text-text-default tablet:text-lg-r">
            이미지 등록
          </span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={onChange}
          />
        </label>
      )}
    </div>
  );
}
