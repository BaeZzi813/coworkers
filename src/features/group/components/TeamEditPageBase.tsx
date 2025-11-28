import { Button } from "@/components/button";
import { AvatarInput, TextField } from "@/components/input";
import { ErrorAlert } from "@/components/modal";
import { useGroupMutation } from "@/features/group/query/use-group-mutation";
import TeamEditContainer from "@/features/team/components/TeamEditContainer";
import { useResponsive } from "@/hooks/use-responsive";
import { Group } from "@/types/group";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";
import { ChangeEvent, useId, useState } from "react";

interface Props {
  group?: Group;
}

export default function TeamEditPageBase({ group }: Props) {
  const { isMobile } = useResponsive();
  const [imageFile, setImageFile] = useState<File>();
  const [name, setName] = useState(group?.name ?? "");
  const textFieldId = useId();
  const router = useRouter();
  const { postMutation, patchMutation } = useGroupMutation();

  const handleFileChange = (file: File) => {
    setImageFile(file);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleSuccess = (group: Group) => {
    router.push(`/${group.id}`);
  };

  const handleError = (title: string, error: Error) => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <ErrorAlert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title={title}
          error={error}
        />
      ),
      { overlayId: "group-edit-error-alert" }
    );
  };

  const handleSubmit = async () => {
    if (group) {
      patchMutation.mutate(
        { groupId: group.id, imageFile, name },
        {
          onSuccess: handleSuccess,
          onError: (error) => handleError("팀 수정 실패", error),
        }
      );
    } else {
      postMutation.mutate(
        { imageFile, name },
        {
          onSuccess: handleSuccess,
          onError: (error) => handleError("팀 생성 실패", error),
        }
      );
    }
  };

  return (
    <div className="flex h-full items-center bg-background-secondary px-4">
      <TeamEditContainer
        className="m-auto"
        header={group ? "팀 수정하기" : "팀 생성하기"}
        footer="팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요."
      >
        <div className="flex flex-col items-center">
          <AvatarInput source={group?.image} onChange={handleFileChange} />
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
            title={group ? "수정하기" : "생성하기"}
            disabled={!name.trim()}
            onClick={handleSubmit}
          />
        </div>
      </TeamEditContainer>
    </div>
  );
}
