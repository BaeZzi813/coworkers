import KakaotalkIcon from "@/assets/icons/ic-kakaotalk.svg";
import { Button } from "@/components/button";
import InputLabel from "@/features/login/components/FormField";
import PasswordVisible from "@/features/login/components/PasswordVisible";
import { validateEmail, validatePassword } from "@/utils/login-validator";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const handleEmailChangeValidate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setEmail(e.target.value);
  };

  const handlePasswordChangeValidate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(e.target.value);
  };

  const handleEmailBlurValidate = () => {
    const emailResult = validateEmail(email);
    setEmailError(emailResult.valid ? undefined : emailResult.reason);
  };

  const handlePasswordBlurValidate = () => {
    const passwordResult = validatePassword(password);
    setPasswordError(passwordResult.valid ? undefined : passwordResult.reason);
  };

  //인지부하에 대하여, 중첩된 if문,복잡한 조건문 정리
  const marginTop = (() => {
    if (emailError && passwordError) return "mt-12";
    if (emailError) return "mt-9";
    if (passwordError) return "mt-6";
    return "mt-3";
  })();

  // 포커스 해제하지않은 상태에서 에러상태 해제 후 로그인 눌렀을 때 시나리오를 생각해서 로그인 버튼 클릭 유효성검사는 유지
  const handleLoginButtonClick = () => {
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);

    setEmailError(emailResult.valid ? undefined : emailResult.reason);
    setPasswordError(passwordResult.valid ? undefined : passwordResult.reason);
    if (emailResult.valid && passwordResult.valid) {
      // 로그인 로직 추가하기
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary">
      <div className="relative h-[720px] w-[550px] rounded-2xl bg-background-primary">
        <div className="flex flex-col items-center pt-[72px]">
          <h1 className="h-[28px] w-[72px] text-2xl-b text-text-primary">
            로그인
          </h1>
        </div>

        <div className="mx-auto mt-[64px] h-[184px] w-[460px]">
          <div className="h-[80px] w-[460px]">
            <InputLabel
              label="이메일"
              id="email"
              type="email"
              placeholder="이메일을 입력해주세요."
              size="large"
              value={email}
              onChange={handleEmailChangeValidate}
              onBlur={handleEmailBlurValidate}
              errorMessage={emailError}
            />
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
                onChange={handlePasswordChangeValidate}
                onBlur={handlePasswordBlurValidate}
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
        </div>

        <div className={clsx("mx-auto flex w-[460px] justify-end", marginTop)}>
          <button
            type="button"
            className="h-6 w-[176px] cursor-pointer text-right text-lg-m text-brand-primary underline hover:text-lg-s"
          >
            비밀번호를 잊으셨나요?
            {/* 비밀번호 재설정 모달이 나오게 */}
          </button>
        </div>

        <div className="mx-auto mt-10 w-[460px]">
          <Button
            title="로그인"
            variant="primary"
            size="large"
            isFullWidth={true}
            onClick={handleLoginButtonClick}
          />
          {/* 로그인시 엑세스토큰 받고 팀페이지로 이동 */}
        </div>

        <div className="mx-auto mt-6 flex h-[20px] w-[268px] items-center justify-center gap-3">
          <span className="text-lg-m text-text-secondary">
            아직 계정이 없으신가요?
          </span>
          <Link
            href="/signup"
            className="cursor-pointer text-lg-m text-brand-primary underline hover:text-lg-s"
          >
            가입하기
          </Link>
        </div>

        <div className="mx-auto mt-[60px] flex h-[20px] w-[460px] items-center">
          <div className="h-px flex-1 bg-border-primary"></div>
          <span className="px-10 text-xl-r text-text-default">OR</span>
          <div className="h-px flex-1 bg-border-primary"></div>
        </div>

        <div className="mx-auto mt-6 flex h-[44px] w-[460px] items-center justify-between pb-[72px]">
          <span className="text-lg-m text-text-default">간편 로그인하기</span>
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
