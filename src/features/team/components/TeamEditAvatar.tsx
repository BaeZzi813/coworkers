import TeamImageEdit18 from "@/assets/images/team-image-edit-18.svg";
import TeamImageEdit32 from "@/assets/images/team-image-edit-32.svg";
import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import Image from "next/image";

interface Props {
  source?: string;
}

export default function TeamEditAvatar({ source }: Props) {
  const { isMobile } = useResponsive();

  return (
    <div className="relative flex h-[78px] w-[77px] items-center justify-center tablet:h-[116px] tablet:w-28">
      <div className="flex size-16 items-center justify-center overflow-hidden rounded-[20px] bg-background-tertiary tablet:size-[100px] tablet:rounded-4xl">
        {source ? (
          <Image src={source} fill alt="Team Avatar" />
        ) : (
          <Icon name="image" />
        )}
      </div>
      <div className="absolute right-0 bottom-1.5 rounded-full border-2 border-white">
        {isMobile ? <TeamImageEdit18 /> : <TeamImageEdit32 />}
      </div>
    </div>
  );
}
