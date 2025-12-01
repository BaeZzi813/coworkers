import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Alert } from "@/components/modal";
import { OverlayProps } from "@/components/overlay";
import { useResetPasswordMutation } from "@/features/user/query";
import { overlay } from "overlay-kit";
import { useState } from "react";

export default function ResetPasswordAlert({
  isOpen,
  onClose,
  onExit,
}: OverlayProps) {
  const [resetEmail, setResetEmail] = useState("");
  const { postMutation } = useResetPasswordMutation();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setResetEmail(event.target.value);
  };

  const handleNestedExit = (nestedUnmount: () => void) => {
    nestedUnmount();
    onExit?.();
  };

  const handleSuccess = (message: string) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <NestedAlert
        isOpen={isOpen}
        onClose={close}
        onExit={() => handleNestedExit(unmount)}
        message={message}
      />
    ));
  };

  const handleError = (error: Error) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <NestedAlert
        isOpen={isOpen}
        onClose={close}
        onExit={() => handleNestedExit(unmount)}
        message={error.message}
      />
    ));
  };

  const handleSendLinkClick = () => {
    postMutation.mutate(
      { email: resetEmail },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      }
    );
    onClose();
  };

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      title="비밀번호 재설정"
      message="비밀번호 재설정 링크를 보내드립니다."
      content={
        <Input
          type="email"
          value={resetEmail}
          placeholder="이메일을 입력하세요."
          size="large"
          onChange={handleEmailChange}
        />
      }
      actions={[
        <Button
          key="reset-password-alert-close"
          title="닫기"
          variant="outlinedPrimary"
          isFullWidth={true}
          onClick={onClose}
        />,
        <Button
          key="reset-password-alert-send"
          title="링크 보내기"
          isFullWidth={true}
          onClick={handleSendLinkClick}
        />,
      ]}
    />
  );
}

function NestedAlert({
  isOpen,
  onClose,
  onExit,
  message,
}: OverlayProps & { message: string }) {
  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
      title="재설정 이메일 전송"
      message={message}
      actions={[
        <Button key="nested-alert-confirm" title="확인" onClick={onClose} />,
      ]}
      showsCloseButton={false}
    />
  );
}

export function openResetPasswordAlert() {
  overlay.open(
    ({ isOpen, close, unmount }) => (
      <ResetPasswordAlert isOpen={isOpen} onClose={close} onExit={unmount} />
    ),
    { overlayId: "reset-password-alert" }
  );
}
