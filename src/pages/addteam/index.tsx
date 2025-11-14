import { Button } from "@/components/button";
import { Input } from "@/components/input";
import TeamEditAvatar from "@/features/team/components/TeamEditAvatar";
import TeamEditContainer from "@/features/team/components/TeamEditContainer";
import { useResponsive } from "@/hooks/use-responsive";

export default function AddTeamPage() {
  const { isMobile } = useResponsive();

  return (
    <div className="flex h-full items-center bg-background-secondary px-4">
      <TeamEditContainer
        className="m-auto"
        header="팀 생성하기"
        footer="팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요."
      >
        <div className="flex flex-col items-center">
          <TeamEditAvatar />
          <div className="mt-6 flex w-full flex-col gap-3">
            <label htmlFor="team-name" className="text-md-m tablet:text-lg-m">
              팀 이름
            </label>
            <Input
              id="team-name"
              placeholder="팀 이름을 입력해주세요."
              size={isMobile ? "small" : "large"}
            />
          </div>
          <Button className="mt-10" title="생성하기" />
        </div>
      </TeamEditContainer>
    </div>
  );
}
