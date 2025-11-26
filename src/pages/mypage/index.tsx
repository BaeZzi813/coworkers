import { Button } from "@/components/button";
import Icon from "@/components/icon";
import { Alert } from "@/components/modal";
import InputLabel from "@/features/login/components/InputLabel";
import TeamEditImageInput from "@/features/team/components/TeamEditImageInput";
import { overlay } from "overlay-kit";
import { useState } from "react";

export default function MyPage() {
  const [name, setName] = useState("찬민테스트");
  const [email] = useState("chanmin@text.com");

  const handleChangePasswordClick = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <Alert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="비밀번호 변경하기"
          content={
            <div className="flex flex-col gap-10">
              <div className="h-16">
                <InputLabel
                  label="새 비밀번호"
                  id="newPassword"
                  type="password"
                  placeholder="새 비밀번호를 입력해주세요."
                  size="large"
                />
              </div>

              <div className="h-20">
                <InputLabel
                  label="새 비밀번호 확인"
                  id="confirmNewPassword"
                  type="password"
                  placeholder="다시 한 번 입력해주세요."
                  size="large"
                />
              </div>
            </div>
          }
          actions={[
            <Button
              key="close"
              title="닫기"
              variant="outlinedPrimary"
              size="large"
              isFullWidth={true}
              onClick={close}
            />,
            <Button
              key="change"
              title="변경하기"
              variant="primary"
              size="large"
              isFullWidth={true}
              onClick={close}
            />,
          ]}
        />
      ),
      { overlayId: "change-password-alert" }
    );
  };

  const handleMembershipWithdrawalClick = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <Alert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          header={
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-status-danger">
              <Icon name="alert" size="large" color="white" />
            </div>
          }
          title="회원 탈퇴를 진행하시겠어요?"
          message="그룹장으로 있는 그룹은 자동으로 삭제되고, 모든 그룹에서 나가집니다."
          actions={[
            <Button
              key="close"
              title="닫기"
              variant="outlinedPrimary"
              size="large"
              isFullWidth={true}
              onClick={close}
            />,
            <Button
              key="secession"
              title="회원 탈퇴"
              variant="danger"
              size="large"
              isFullWidth={true}
              onClick={close}
            />,
          ]}
        />
      ),
      { overlayId: "secession-alert" }
    );
  };

  return (
    <div className="flex h-screen items-center justify-center bg-background-secondary">
      <div className="flex h-195 w-230 flex-col rounded-2xl border border-border-primary bg-background-primary px-18 pt-16 pb-16">
        <h1 className="mb-10 text-2xl-b text-text-primary">계정 설정</h1>

        <div className="mb-9 flex justify-center">
          <TeamEditImageInput
            onChange={(file) => {
              console.log(file);
            }}
          />
        </div>

        <div className="flex flex-col gap-6">
          <InputLabel
            label="이름"
            id="name"
            type="text"
            placeholder="이름을 입력해주세요."
            size="large"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />

          <InputLabel
            label="이메일"
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            size="large"
            value={email}
            disabled
          />

          <InputLabel
            label="비밀번호"
            id="password"
            type="password"
            size="large"
            value="********"
            disabled
            trailing={
              <Button
                title="변경하기"
                variant="primary"
                size="small"
                isFullWidth={false}
                onClick={handleChangePasswordClick}
              />
            }
          />

          <div className="mt-1 flex items-center gap-2">
            <button
              className="flex h-6 w-32 cursor-pointer items-center text-left text-lg-m text-status-danger hover:text-lg-s hover:underline"
              onClick={handleMembershipWithdrawalClick}
            >
              <Icon name="secession" size="large" />
              회원 탈퇴하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
