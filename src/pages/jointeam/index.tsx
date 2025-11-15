import { Button } from "@/components/button";
import { Input } from "@/components/input";
import TeamEditContainer from "@/features/team/components/TeamEditContainer";
import { useResponsive } from "@/hooks/use-responsive";
import { ChangeEvent, useState } from "react";

export default function JoinTeamPage() {
  const { isMobile } = useResponsive();
  const [teamName, setTeamName] = useState("");

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  return (
    <div className="flex h-full items-center bg-background-secondary px-4">
      <TeamEditContainer
        className="m-auto"
        header="팀 참여하기"
        footer="공유받은 팀 링크를 입력해 참여할 수 있어요."
      >
        <div className="flex flex-col items-center">
          <div className="mt-6 flex w-full flex-col gap-3">
            <label htmlFor="team-name" className="text-md-m tablet:text-lg-m">
              팀 링크
            </label>
            <Input
              id="team-name"
              value={teamName}
              placeholder="팀 링크를 입력해주세요."
              size={isMobile ? "small" : "large"}
              onChange={handleNameChange}
            />
          </div>
          <Button
            className="mt-10"
            title="참여하기"
            disabled={!teamName.trim()}
          />
        </div>
      </TeamEditContainer>
    </div>
  );
}
