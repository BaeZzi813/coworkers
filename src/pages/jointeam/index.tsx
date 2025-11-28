import { Button } from "@/components/button";
import { TextField } from "@/components/input";
import { Alert, ErrorAlert } from "@/components/modal";
import { useGroupMutation } from "@/features/group/query/use-group-mutation";
import TeamEditContainer from "@/features/team/components/TeamEditContainer";
import { useResponsive } from "@/hooks/use-responsive";
import { useAuthStore } from "@/stores/auth-store";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";
import { ChangeEvent, useId, useState } from "react";

export default function JoinTeamPage() {
  const user = useAuthStore((state) => state.user);
  const { isMobile } = useResponsive();
  const [inputValue, setInputValue] = useState("");
  const textFieldId = useId();
  const { postInvitationMutation } = useGroupMutation();
  const router = useRouter();

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleJoinSuccess = ({ groupId }: { groupId: number }) => {
    overlay.open(
      ({ isOpen, close, unmount }) => {
        const handleDashboardClick = () => {
          router.push("/dashboard");
          close();
        };

        const handleTeamPageClick = () => {
          router.push(`/${groupId}`);
          close();
        };

        return (
          <Alert
            isOpen={isOpen}
            onClose={close}
            onExit={unmount}
            title="팀 참여 성공"
            message="팀 페이지로 이동할까요?"
            actions={[
              <Button
                key="join-team-success-alert-dashboard"
                variant="outlinedPrimary"
                title="대시보드로 이동"
                onClick={handleDashboardClick}
              />,
              <Button
                key="join-team-success-alert-action"
                title="팀 페이지로 이동"
                onClick={handleTeamPageClick}
              />,
            ]}
            showsCloseButton={false}
            allowsBackgroundDismiss={false}
          />
        );
      },
      { overlayId: "join-team-success-alert" }
    );
  };

  const handleJoinError = (error: Error) => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <ErrorAlert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="팀 참여 실패"
          error={error}
        />
      ),
      { overlayId: "join-team-error-alert" }
    );
  };

  const handleJoinClick = () => {
    if (!user) {
      return;
    }

    postInvitationMutation.mutate(
      {
        userEmail: user.email,
        token: inputValue,
      },
      {
        onSuccess: handleJoinSuccess,
        onError: handleJoinError,
      }
    );
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
            <label htmlFor={textFieldId} className="text-md-m tablet:text-lg-m">
              팀 링크
            </label>
            <TextField
              id={textFieldId}
              placeholder="팀 링크를 입력해주세요."
              size={isMobile ? "small" : "large"}
              onChange={handleNameChange}
            />
          </div>
          <Button
            className="mt-10"
            title="참여하기"
            disabled={!inputValue.trim()}
            onClick={handleJoinClick}
          />
        </div>
      </TeamEditContainer>
    </div>
  );
}
