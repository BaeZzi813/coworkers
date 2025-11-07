import PlaceholderLargeImage from "@/assets/images/avatar-placeholder-lg.svg";
import PlaceholderMediumImage from "@/assets/images/avatar-placeholder-md.svg";
import PlaceholderSmallImage from "@/assets/images/avatar-placeholder-sm.svg";
import Image from "next/image";
import { FC, SVGProps } from "react";

type AvatarSize = "small" | "medium" | "large";

interface Props {
  source?: string;
  size?: AvatarSize;
}

const placeholderImage: Record<AvatarSize, FC<SVGProps<SVGSVGElement>>> = {
  small: PlaceholderSmallImage,
  medium: PlaceholderMediumImage,
  large: PlaceholderLargeImage,
};

const imageSize: Record<AvatarSize, number> = {
  small: 24,
  medium: 32,
  large: 40,
};

const borderRadius: Record<AvatarSize, string> = {
  small: "rounded-[6px]",
  medium: "rounded-[8px]",
  large: "rounded-[12px]",
};

export default function Avatar({ source, size = "large" }: Props) {
  if (!source) {
    const Placeholder = placeholderImage[size];
    return <Placeholder width={imageSize[size]} height={imageSize[size]} />;
  }

  return (
    <Image
      className={borderRadius[size]}
      src={source}
      alt="User Avatar"
      width={imageSize[size]}
      height={imageSize[size]}
    />
  );
}
