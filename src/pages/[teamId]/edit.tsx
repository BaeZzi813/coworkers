import { Button } from "@/components/button";
import { TextField } from "@/components/input";
import { getGroup } from "@/features/group/apis";
import TeamEditContainer from "@/features/team/components/TeamEditContainer";
import TeamEditImageInput from "@/features/team/components/TeamEditImageInput";
import { useResponsive } from "@/hooks/use-responsive";
import {
  GSSP_NOT_FOUND_RETURN,
  gsspPropsWithTokenReturn,
} from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { Group } from "@/types/group";
import { ChangeEvent, useId, useState } from "react";

interface PageProps {
  group: Group;
}

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const params = context.params;
  const teamId = Number(params?.teamId);
  if (isNaN(teamId)) {
    return GSSP_NOT_FOUND_RETURN;
  }

  const group = await getGroup({ groupId: teamId }, { accessToken });
  return gsspPropsWithTokenReturn({ props: { group }, accessToken });
});

export default serverSideComponentWithAuth<PageProps>(({ group }) => {
  const { isMobile } = useResponsive();
  const [teamName, setTeamName] = useState(group.name);
  const textFieldId = useId();

  const handleFileChange = (file: File) => {
    // TODO: File upload
    console.log(file);
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTeamName(event.target.value);
  };

  const handleSubmit = () => {
    // TODO: Group 수정 API 연동
  };

  return (
    <div className="flex h-full items-center bg-background-secondary px-4">
      <TeamEditContainer
        className="m-auto"
        header="팀 수정하기"
        footer="팀 이름은 회사명이나 모임 이름 등으로 설정하면 좋아요."
      >
        <div className="flex flex-col items-center">
          <TeamEditImageInput
            source={group.image}
            onChange={handleFileChange}
          />
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
            title="수정하기"
            disabled={!teamName.trim()}
            onClick={handleSubmit}
          />
        </div>
      </TeamEditContainer>
    </div>
  );
});
