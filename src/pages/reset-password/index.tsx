import { Button } from "@/components/button";
import PasswordInputLabel from "@/components/input/PasswordInputLabel";
import { Alert, ErrorAlert } from "@/components/modal";
import { useResetPasswordMutation } from "@/features/user/query";
import PageLayout from "@/layouts/PageLayout";
import {
  validatePassword,
  validatePasswordConfirm,
} from "@/utils/login-validator";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";
import { MouseEvent, useState } from "react";

interface StateValue {
  password: string;
  confirmedPassword: string;
}

const INITIAL_STATE_VALUE: StateValue = {
  password: "",
  confirmedPassword: "",
};

export default function ResetPasswordPage() {
  const [value, setValue] = useState(INITIAL_STATE_VALUE);
  const [errorMessage, setErrorMessage] = useState(INITIAL_STATE_VALUE);
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const { token } = router.query;
  const { patchMutation } = useResetPasswordMutation();

  const canSubmit =
    value.password !== "" &&
    value.confirmedPassword !== "" &&
    errorMessage.password === "" &&
    errorMessage.confirmedPassword === "";

  const handlePasswordChange = (value: string) => {
    setValue((prev) => ({ ...prev, password: value }));
  };

  const handlePasswordBlur = () => {
    const result = validatePassword(value.password);
    setErrorMessage((prev) => ({
      ...prev,
      password: result.valid ? "" : result.reason!,
    }));
  };

  const handleConfirmedPasswordChange = (value: string) => {
    setValue((prev) => ({ ...prev, confirmedPassword: value }));
  };

  const handleConfirmPasswordBlur = () => {
    const result = validatePasswordConfirm(
      value.password,
      value.confirmedPassword
    );
    setErrorMessage((prev) => ({
      ...prev,
      confirmedPassword: result.valid ? "" : result.reason!,
    }));
  };

  const handleSuccess = () => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleClick = () => {
        router.push("/login");
        close();
      };

      return (
        <Alert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="비밀번호 재설정 성공"
          message="비밀번호가 성공적으로 재설정되었습니다."
          actions={[
            <Button key="confirm" title="로그인 하기" onClick={handleClick} />,
          ]}
          showsCloseButton={false}
        />
      );
    });
  };

  const handleError = (error: Error) => {
    overlay.open(({ isOpen, close, unmount }) => (
      <ErrorAlert
        isOpen={isOpen}
        onClose={close}
        onExit={unmount}
        title="비밀번호 재설정 실패"
        error={error}
      />
    ));
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    patchMutation.mutate(
      {
        password: value.password,
        confirmedPassword: value.confirmedPassword,
        token: token as string,
      },
      {
        onSuccess: handleSuccess,
        onError: handleError,
      }
    );
  };

  return (
    <PageLayout className="flex items-center justify-center px-4 tablet:px-6">
      <div className="w-full max-w-[550px] rounded-[20px] bg-background-primary px-[22px] py-[52px] tablet:px-[45px] tablet:py-[71px]">
        <h1 className="text-center text-xl-b text-text-primary tablet:text-2xl-b">
          비밀번호 재설정
        </h1>
        <form className="mt-8 flex flex-col gap-6 tablet:mt-16">
          <PasswordInputLabel
            label="비밀번호"
            id="password"
            value={value.password}
            placeholder="비밀번호를 입력해주세요."
            onChange={handlePasswordChange}
            onBlur={handlePasswordBlur}
            errorMessage={errorMessage.password}
            visible={visible}
            onVisibleChange={() => setVisible(!visible)}
          />
          <PasswordInputLabel
            label="비밀번호 확인"
            id="confirmPassword"
            value={value.confirmedPassword}
            placeholder="비밀번호를 다시 한 번 입력해주세요."
            onChange={handleConfirmedPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            errorMessage={errorMessage.confirmedPassword}
            visible={visible}
            onVisibleChange={() => setVisible(!visible)}
          />
        </form>
        <Button
          className="mt-10"
          title="비밀번호 재설정"
          onClick={handleSubmit}
          disabled={!canSubmit}
        />
      </div>
    </PageLayout>
  );
}
