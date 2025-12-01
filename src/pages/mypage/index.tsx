import { Button } from "@/components/button";
import Icon from "@/components/icon";
import { AvatarInput } from "@/components/input";
import { Alert, ErrorAlert } from "@/components/modal";
import InputLabel from "@/features/login/components/InputLabel";
import PasswordVisible from "@/features/login/components/PasswordVisible";
import { deleteUser, patchChangePassword } from "@/features/mypage/api";
import { clientProxyInstance } from "@/services/instance/client";
import { useAuthStore } from "@/stores/auth-store";
import {
  validatePassword,
  validatePasswordConfirm,
} from "@/utils/login-validator";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";
import { useState } from "react";

export default function MyPage() {
  const user = useAuthStore((state) => state.user);
  const logOut = useAuthStore((state) => state.logOut);
  const router = useRouter();
  const [name, setName] = useState(user?.nickname || "");
  const email = user?.email || "";

  const handleChangePasswordClick = () => {
    if (!user?.teamId) {
      return;
    }
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <ChangePasswordModal
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          teamId={user.teamId}
        />
      ),
      { overlayId: "change-password-alert" }
    );
  };

  const handleMembershipWithdrawalClick = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <SecessionAlert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          teamId={user?.teamId || ""}
          onSuccess={async () => {
            try {
              await clientProxyInstance.post("/api/auth/signOut");
            } catch (error) {
              console.error("Sign out error:", error);
            }
            logOut();
            router.replace("/login");
          }}
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
          <AvatarInput
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

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  teamId: string;
}

function ChangePasswordModal({
  isOpen,
  onClose,
  onExit,
  teamId,
}: ChangePasswordModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [newPasswordError, setNewPasswordError] = useState<
    string | undefined
  >();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >();
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const passwordResult = validatePassword(newPassword);
    const confirmResult = validatePasswordConfirm(newPassword, confirmPassword);

    setNewPasswordError(
      passwordResult.valid ? undefined : passwordResult.reason
    );
    setConfirmPasswordError(
      confirmResult.valid ? undefined : confirmResult.reason
    );

    return passwordResult.valid && confirmResult.valid;
  };

  const handleNewPasswordBlur = () => {
    const result = validatePassword(newPassword);
    setNewPasswordError(result.valid ? undefined : result.reason);
  };

  const handleConfirmPasswordBlur = () => {
    const result = validatePasswordConfirm(newPassword, confirmPassword);
    setConfirmPasswordError(result.valid ? undefined : result.reason);
  };

  const handleChangeClick = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      await patchChangePassword({
        teamId,
        password: newPassword,
        passwordConfirmation: confirmPassword,
      });
      overlay.open(
        ({ isOpen, close, unmount }) => (
          <Alert
            isOpen={isOpen}
            onClose={close}
            onExit={unmount}
            title="비밀번호가 변경되었습니다"
            actions={[
              <Button
                key="confirm"
                title="확인"
                variant="primary"
                size="large"
                isFullWidth={true}
                onClick={close}
              />,
            ]}
          />
        ),
        { overlayId: "password-change-success-alert" }
      );
    } catch {
      overlay.open(
        ({ isOpen, close, unmount }) => (
          <ErrorAlert
            isOpen={isOpen}
            onClose={close}
            onExit={unmount}
            title="비밀번호 변경이 실패하였습니다."
            error={new Error("다시 시도해주세요.")}
          />
        ),
        { overlayId: "password-change-error-alert" }
      );
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  const isFormValid = () => {
    const passwordResult = validatePassword(newPassword);
    const confirmResult = validatePasswordConfirm(newPassword, confirmPassword);
    return passwordResult.valid && confirmResult.valid;
  };

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
      title="비밀번호 변경하기"
      content={
        <div className="flex flex-col gap-20">
          <div className={newPasswordError ? "h-10" : "h-6"}>
            <InputLabel
              label="새 비밀번호"
              id="newPassword"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="새 비밀번호를 입력해주세요."
              size="large"
              value={newPassword}
              onChange={(event) => {
                setNewPassword(event.target.value);
                setNewPasswordError(undefined);
              }}
              onBlur={handleNewPasswordBlur}
              errorMessage={newPasswordError}
              trailing={
                <PasswordVisible
                  isVisible={isPasswordVisible}
                  onToggle={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
            />
          </div>

          <div className={confirmPasswordError ? "mb-16 h-10" : "mb-16 h-6"}>
            <InputLabel
              label="새 비밀번호 확인"
              id="confirmNewPassword"
              type={isPasswordVisible ? "text" : "password"}
              placeholder="다시 한 번 입력해주세요."
              size="large"
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setConfirmPasswordError(undefined);
              }}
              onBlur={handleConfirmPasswordBlur}
              errorMessage={confirmPasswordError}
              trailing={
                <PasswordVisible
                  isVisible={isPasswordVisible}
                  onToggle={() => setIsPasswordVisible(!isPasswordVisible)}
                />
              }
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
          onClick={onClose}
          disabled={isLoading}
        />,
        <Button
          key="change"
          title="변경하기"
          variant="primary"
          size="large"
          isFullWidth={true}
          onClick={handleChangeClick}
          disabled={!isFormValid() || isLoading}
        />,
      ]}
    />
  );
}

interface SecessionAlertProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  teamId: string;
  onSuccess: () => void;
}

function SecessionAlert({
  isOpen,
  onClose,
  onExit,
  teamId,
  onSuccess,
}: SecessionAlertProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSecessionClick = async () => {
    if (!teamId) {
      return;
    }

    setIsLoading(true);
    try {
      await deleteUser({ teamId });
      onClose();
      // 회원 탈퇴 성공 모달 표시
      overlay.open(
        ({ isOpen, close, unmount }) => (
          <Alert
            isOpen={isOpen}
            onClose={close}
            onExit={unmount}
            title="회원 탈퇴가 완료되었습니다"
            actions={[
              <Button
                key="confirm"
                title="확인"
                variant="primary"
                size="large"
                isFullWidth={true}
                onClick={() => {
                  close();
                  onSuccess();
                }}
              />,
            ]}
          />
        ),
        { overlayId: "secession-success-alert" }
      );
    } catch {
      overlay.open(
        ({ isOpen, close, unmount }) => (
          <ErrorAlert
            isOpen={isOpen}
            onClose={close}
            onExit={unmount}
            title="회원 탈퇴가 실패하였습니다."
            error={new Error("다시 시도해주세요.")}
          />
        ),
        { overlayId: "secession-error-alert" }
      );
    } finally {
      setIsLoading(false);
    }
    onClose();
  };

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
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
          onClick={onClose}
          disabled={isLoading}
        />,
        <Button
          key="secession"
          title="회원 탈퇴"
          variant="danger"
          size="large"
          isFullWidth={true}
          onClick={handleSecessionClick}
          disabled={isLoading}
        />,
      ]}
    />
  );
}
