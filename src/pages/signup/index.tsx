import KakaotalkIcon from "@/assets/icons/ic-kakaotalk.svg";
import { Button } from "@/components/button";
import InputLabel from "@/features/login/components/FormField";
import PasswordVisible from "@/features/login/components/PasswordVisible";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
} from "@/utils/login-validator";
import { useState } from "react";

export default function SignUpPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [confirmPasswordError, setConfirmPasswordError] = useState<
    string | undefined
  >();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameBlur = () => {
    const nameResult = validateName(name);
    setNameError(nameResult.valid ? undefined : nameResult.reason);
  };

  const handleEmailBlur = () => {
    const emailResult = validateEmail(email);
    setEmailError(emailResult.valid ? undefined : emailResult.reason);
  };

  const handlePasswordBlur = () => {
    const passwordResult = validatePassword(password);
    setPasswordError(passwordResult.valid ? undefined : passwordResult.reason);
  };

  const handleConfirmPasswordBlur = () => {
    const confirmPasswordResult = validatePasswordConfirm(
      password,
      confirmPassword
    );
    setConfirmPasswordError(
      confirmPasswordResult.valid ? undefined : confirmPasswordResult.reason
    );
  };

  const marginTop = (() => {
    const errors = [nameError, emailError, passwordError, confirmPasswordError];
    const errorCount = errors.filter(Boolean).length;
    if (errorCount >= 3) return "mt-12";
    if (errorCount === 2) return "mt-9";
    if (errorCount === 1) return "mt-6";
    return "mt-3";
  })();

  const handleSignUpButtonClick = () => {
    const nameResult = validateName(name);
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);
    const confirmPasswordResult = validatePasswordConfirm(
      password,
      confirmPassword
    );

    setNameError(nameResult.valid ? undefined : nameResult.reason);
    setEmailError(emailResult.valid ? undefined : emailResult.reason);
    setPasswordError(passwordResult.valid ? undefined : passwordResult.reason);
    setConfirmPasswordError(
      confirmPasswordResult.valid ? undefined : confirmPasswordResult.reason
    );

    if (
      nameResult.valid &&
      emailResult.valid &&
      passwordResult.valid &&
      confirmPasswordResult.valid
    ) {
      // 회원가입 로직 추가하기
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary">
      <div className="relative w-[550px] rounded-2xl bg-background-primary">
        <div className="flex flex-col items-center pt-[72px]">
          <h1 className="h-[28px] w-[96px] text-2xl-b text-text-primary">
            회원가입
          </h1>
        </div>

        <div className="mx-auto mt-[64px] w-[460px]">
          <div className="h-[80px] w-[460px]">
            <InputLabel
              label="이름"
              id="name"
              type="text"
              placeholder="이름을 입력해주세요."
              size="large"
              value={name}
              onChange={handleNameChange}
              onBlur={handleNameBlur}
              errorMessage={nameError}
            />
          </div>

          <div className={nameError ? "mt-12" : "mt-6"}>
            <div className="h-[80px] w-[460px]">
              <InputLabel
                label="이메일"
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                size="large"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                errorMessage={emailError}
              />
            </div>
          </div>

          <div className={emailError ? "mt-12" : "mt-6"}>
            <div className="h-[80px] w-[460px]">
              <InputLabel
                label="비밀번호"
                id="password"
                type={isPasswordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력해주세요."
                size="large"
                value={password}
                onChange={handlePasswordChange}
                onBlur={handlePasswordBlur}
                errorMessage={passwordError}
                trailing={
                  <PasswordVisible
                    isVisible={isPasswordVisible}
                    onToggle={() => setIsPasswordVisible(!isPasswordVisible)}
                  />
                }
              />
            </div>
          </div>

          <div className={passwordError ? "mt-12" : "mt-6"}>
            <div className="h-[80px] w-[460px]">
              <InputLabel
                label="비밀번호 확인"
                id="confirmPassword"
                type={isConfirmPasswordVisible ? "text" : "password"}
                placeholder="비밀번호를 다시 한 번 입력해주세요."
                size="large"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                onBlur={handleConfirmPasswordBlur}
                errorMessage={confirmPasswordError}
                trailing={
                  <PasswordVisible
                    isVisible={isConfirmPasswordVisible}
                    onToggle={() =>
                      setIsConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                  />
                }
              />
            </div>
          </div>
        </div>

        <div className="mx-auto mt-12 w-[460px]">
          <Button
            title="회원가입"
            variant="primary"
            size="large"
            isFullWidth={true}
            onClick={handleSignUpButtonClick}
          />
          {/* 회원가입 완료시 로그인 페이지로 이동하게 만들기 (스웨거에 api는 나오지만 로그인때 생성되는 토큰만 사용) */}
        </div>

        <div className="mx-auto mt-[60px] flex h-[20px] w-[460px] items-center">
          <div className="h-px flex-1 bg-border-primary"></div>
          <span className="px-10 text-xl-r text-text-default">OR</span>
          <div className="h-px flex-1 bg-border-primary"></div>
        </div>

        <div className="mx-auto mt-6 flex h-[44px] w-[460px] items-center justify-between pb-[72px]">
          <span className="text-lg-m text-text-default">간편 회원가입하기</span>
          <button
            type="button"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg"
            aria-label="카카오톡 로그인"
          >
            <KakaotalkIcon width={42} height={42} />
          </button>
        </div>
      </div>
    </div>
  );
}
