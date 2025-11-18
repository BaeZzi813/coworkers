import { Button } from "@/components/button";
import { TextField } from "@/components/input";
import TeamEditContainer from "@/features/team/components/TeamEditContainer";
import TeamEditImageInput from "@/features/team/components/TeamEditImageInput";
import { useResponsive } from "@/hooks/use-responsive";
import { ChangeEvent, useId, useState } from "react";

export default function AddTeamPage() {
  const { isMobile } = useResponsive();
  const [teamName, setTeamName] = useState("");
  const textFieldId = useId();

  const handleFileChange = (file: File) => {
    // TODO: File upload
    console.log(file);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  return (
    <div className="flex h-full items-center bg-background-secondary px-4">
      <TeamEditContainer
        className="m-auto"
        header="팀 생성하기"
        footer="팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요."
      >
        <div className="flex flex-col items-center">
          <TeamEditImageInput onChange={handleFileChange} />
          <div className="mt-6 flex w-full flex-col gap-3">
            <label htmlFor={textFieldId} className="text-md-m tablet:text-lg-m">
              팀 이름
            </label>
            <TextField
              id={textFieldId}
              value={teamName}
              placeholder="팀 이름을 입력해주세요."
              size={isMobile ? "small" : "large"}
              onChange={handleNameChange}
            />
          </div>
          <Button
            className="mt-10"
            title="생성하기"
            disabled={!teamName.trim()}
          />
        </div>
      </TeamEditContainer>
    </div>
  );
}
