import TeamImageEdit18 from "@/assets/images/team-image-edit-18.svg";
import TeamImageEdit32 from "@/assets/images/team-image-edit-32.svg";
import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import clsx from "clsx";
import Image from "next/image";
import { PropsWithChildren, useState } from "react";

interface Props {
  source?: string;
  onChange?: (file: File) => void;
}

export default function TeamEditAvatar({ source, onChange }: Props) {
  const { isMobile } = useResponsive();
  const [previewUrl, setPreviewUrl] = useState<string>();

  const imageSource = previewUrl ?? source;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    onChange?.(file);
  };

  return (
    <>
      <label
        htmlFor="team-image"
        className="relative flex h-[78px] w-[77px] cursor-pointer items-center justify-center tablet:h-[116px] tablet:w-28"
      >
        {imageSource ? (
          <ImageContainer className="relative">
            <Image
              className="object-cover"
              src={imageSource}
              alt="Team Avatar"
              fill
            />
          </ImageContainer>
        ) : (
          <ImageContainer className="flex items-center justify-center bg-background-tertiary">
            <Icon name="image" />
          </ImageContainer>
        )}
        <div className="absolute right-0 bottom-1.5 rounded-full border-2 border-white">
          {isMobile ? <TeamImageEdit18 /> : <TeamImageEdit32 />}
        </div>
      </label>
      <input
        id="team-image"
        className="hidden"
        type="file"
        accept="image/*"
        onChange={handleChange}
      />
    </>
  );
}

function ImageContainer({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={clsx(
        "size-16 overflow-hidden rounded-[20px] tablet:size-[100px] tablet:rounded-4xl",
        className
      )}
    >
      {children}
    </div>
  );
}
