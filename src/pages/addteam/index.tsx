import { Button } from "@/components/button";
import { TextField } from "@/components/input";
import { useGroupMutation } from "@/features/group/query/use-group-mutation";
import TeamEditContainer from "@/features/team/components/TeamEditContainer";
import TeamEditImageInput from "@/features/team/components/TeamEditImageInput";
import { useResponsive } from "@/hooks/use-responsive";
import { useRouter } from "next/router";
import { ChangeEvent, useId, useState } from "react";

export default function AddTeamPage() {
  const { isMobile } = useResponsive();
  const [imageFile, setImageFile] = useState<File>();
  const [name, setName] = useState("");
  const textFieldId = useId();
  const router = useRouter();
  const { postMutation } = useGroupMutation();

  const handleFileChange = (file: File) => {
    setImageFile(file);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSubmit = async () => {
    postMutation.mutate(
      { imageFile, name },
      {
        onSuccess: (newGroup) => {
          router.push(`/${newGroup.id}`);
        },
        onError: (error) => {
          // TODO: Error handling
          console.error("Failed to create group:", error);
        },
      }
    );
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
              value={name}
              placeholder="팀 이름을 입력해주세요."
              size={isMobile ? "small" : "large"}
              onChange={handleNameChange}
            />
          </div>
          <Button
            className="mt-10"
            title="생성하기"
            disabled={!name.trim()}
            onClick={handleSubmit}
          />
        </div>
      </TeamEditContainer>
    </div>
  );
}
