import KakaotalkIcon from "@/assets/icons/ic-kakaotalk.svg";
import { Button } from "@/components/button";
import { Alert } from "@/components/modal";
import { postSignIn } from "@/features/auth/apis";
import InputLabel from "@/features/login/components/FormField";
import PasswordVisible from "@/features/login/components/PasswordVisible";
import { useAuthStore } from "@/stores/auth-store";
import { validateEmail, validatePassword } from "@/utils/login-validator";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const login = useAuthStore((state) => state.logIn);
  const router = useRouter();

  const handleEmailBlurValidate = () => {
    const emailResult = validateEmail(email);
    setEmailError(emailResult.valid ? undefined : emailResult.reason);
  };

  const handlePasswordBlurValidate = () => {
    const passwordResult = validatePassword(password);
    setPasswordError(passwordResult.valid ? undefined : passwordResult.reason);
  };

  //인지부하 고려, 중첩된 if문,복잡한 조건문 정리
  const marginTop = (() => {
    if (emailError && passwordError) return "mt-12";
    if (emailError) return "mt-9";
    if (passwordError) return "mt-6";
    return "mt-3";
  })();

  const isFormValid =
    validateEmail(email).valid && validatePassword(password).valid;

  const handleLoginButtonClick = async () => {
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);

    setEmailError(emailResult.valid ? undefined : emailResult.reason);
    setPasswordError(passwordResult.valid ? undefined : passwordResult.reason);

    const response = await postSignIn({ email, password });
    login({ accessToken: response.accessToken, user: response.user });
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary">
      <div className="relative h-[720px] w-[550px] rounded-2xl bg-background-primary">
        <div className="flex flex-col items-center pt-18">
          <h1 className="h-7 w-18 text-2xl-b text-text-primary">로그인</h1>
        </div>

        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            handleLoginButtonClick();
          }}
        >
          <div className="mx-auto mt-16 h-[184px] w-[460px]">
            <div className="h-20 w-[460px]">
              <InputLabel
                label="이메일"
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                size="large"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={handleEmailBlurValidate}
                errorMessage={emailError}
              />
            </div>

            <div className={emailError ? "mt-12" : "mt-6"}>
              <div className="h-20 w-[460px]">
                <InputLabel
                  label="비밀번호"
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  size="large"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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

          <div className="mx-auto mt-10 w-[460px]">
            <Button
              title="로그인"
              variant="primary"
              size="large"
              isFullWidth={true}
              disabled={!isFormValid} //회원가입 ui 수정하면서 코드 일관성 유지
              onClick={handleLoginButtonClick}
            />
            {/* 로그인시 엑세스토큰 받고 팀페이지로 이동 */}
          </div>
          <div className="mx-auto mt-6 flex h-5 w-[268px] items-center justify-center gap-3">
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
        </form>

        <div className="mx-auto mt-[60px] flex h-5 w-[460px] items-center">
          <div className="h-px flex-1 bg-border-primary"></div>
          <span className="px-10 text-xl-r text-text-default">OR</span>
          <div className="h-px flex-1 bg-border-primary"></div>
        </div>

        <div className="mx-auto mt-6 flex h-11 w-[460px] items-center justify-between pb-18">
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

      {/* 모달 - 클라이언트 사이드에서만 렌더링 */}
      {typeof window !== "undefined" && (
        <Alert
          isOpen={isPasswordResetModalOpen}
          onClose={handlePasswordResetModalClose}
          title="비밀번호 재설정"
          message="비밀번호 재설정 링크를 보내드립니다."
          content={
            <InputLabel
              label=""
              type="email"
              placeholder="이메일을 입력하세요."
              size="large"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          }
          actions={[
            <Button
              key="close"
              title="닫기"
              variant="outlinedPrimary"
              size="large"
              isFullWidth={true}
              onClick={handlePasswordResetModalClose}
            />,
            <Button
              key="send"
              title="링크 보내기"
              variant="primary"
              size="large"
              isFullWidth={true}
              onClick={handlePasswordResetModalClose}
            />,
          ]}
        />
      )}
    </div>
  );
}
