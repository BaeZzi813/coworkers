import BgTeamPattern from "@/assets/images/bg-team-pattern.png";
import Icon from "@/components/icon";
import GroupEditDropdown from "@/features/group/components/GroupEditDropdown";
import { useResponsive } from "@/hooks/use-responsive";
import { Group } from "@/types/group";
import Image from "next/image";

interface TeamHeaderProps {
  group: Group;
  isAdmin?: boolean;
}

export default function TeamHeader({
  group,
  isAdmin = false,
}: TeamHeaderProps) {
  const { isMobile } = useResponsive();

  return (
    <header className="flex h-7 w-full max-w-[1120px] items-center justify-start rounded-xl bg-none shadow-card outline-border-primary desktop:h-16 desktop:justify-between desktop:bg-background-primary desktop:px-7 desktop:py-4 desktop:outline">
      <h1 className="text-lg-b text-text-primary tablet:text-2xl-b">
        {group.name}
      </h1>

      <Image
        src={BgTeamPattern}
        alt=""
        aria-hidden
        width={326}
        height={102}
        className="mr-2.5 ml-auto hidden desktop:block"
      />

      {isAdmin && (
        <GroupEditDropdown
          group={group}
          anchor={
            <button
              aria-label="팀 설정 열기"
              className="ml-2 cursor-pointer py-1"
            >
              <Icon name="gear" size={isMobile ? "small" : "large"} />
            </button>
          }
        />
      )}
    </header>
  );
}
