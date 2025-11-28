import KakaotalkIcon from "@/assets/icons/ic-kakaotalk.svg";
import { Button } from "@/components/button";
import { postSignIn } from "@/features/auth/apis";
import ResetPasswordAlert from "@/features/auth/components/ResetPasswordAlert";
import InputLabel from "@/features/login/components/InputLabel";
import PasswordVisible from "@/features/login/components/PasswordVisible";
import { useAuthStore } from "@/stores/auth-store";
import { validateEmail, validatePassword } from "@/utils/login-validator";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";
import { FormEvent, useState } from "react";

export default function LoginPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();

  const login = useAuthStore((state) => state.logIn);
  const router = useRouter();

  const validateTotalForm = () => {
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);

    return {
      isValid: emailResult.valid && passwordResult.valid,
      errors: {
        emailError: emailResult.valid ? undefined : emailResult.reason,
        passwordError: passwordResult.valid ? undefined : passwordResult.reason,
      },
    };
  };

  const validateBlurField = (field: "email" | "password") => {
    if (field === "email") {
      const emailResult = validateEmail(email);
      setEmailError(emailResult.valid ? undefined : emailResult.reason);
    } else if (field === "password") {
      const passwordResult = validatePassword(password);
      setPasswordError(
        passwordResult.valid ? undefined : passwordResult.reason
      );
    }
  };

  const handleEmailBlur = () => {
    validateBlurField("email");
  };

  const handlePasswordBlur = () => {
    validateBlurField("password");
  };

  const marginTop = (() => {
    if (emailError && passwordError) return "mt-12";
    if (emailError) return "mt-9";
    if (passwordError) return "mt-6";
    return "mt-3";
  })();

  const isFormValid = validateTotalForm().isValid;

  const handleLoginButtonClick = async () => {
    const validation = validateTotalForm();

    setEmailError(validation.errors.emailError);
    setPasswordError(validation.errors.passwordError);

    if (!validation.isValid) {
      return;
    }

    const response = await postSignIn({ email, password });
    login({ accessToken: response.accessToken, user: response.user });
    router.push("/dashboard");
  };

  const handleForgotPasswordClick = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <ResetPasswordAlert isOpen={isOpen} onClose={close} onExit={unmount} />
      ),
      { overlayId: "password-reset-alert" }
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary">
      <div className="relative h-[720px] w-[550px] rounded-2xl bg-background-primary">
        <div className="flex flex-col items-center pt-18">
          <h1 className="h-7 w-18 text-2xl-b text-text-primary">로그인</h1>
        </div>

        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
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
                onChange={(event) => setEmail(event.target.value)}
                onBlur={handleEmailBlur}
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
                  onChange={(event) => setPassword(event.target.value)}
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
          </div>

          <div
            className={clsx("mx-auto flex w-[460px] justify-end", marginTop)}
          >
            <button
              type="button"
              className="h-6 w-44 cursor-pointer text-right text-lg-m text-brand-primary underline hover:text-lg-s"
              onClick={handleForgotPasswordClick}
            >
              비밀번호를 잊으셨나요?
            </button>
          </div>

          <div className="mx-auto mt-10 w-[460px]">
            <Button
              title="로그인"
              variant="primary"
              size="large"
              isFullWidth={true}
              disabled={!isFormValid}
              onClick={handleLoginButtonClick}
            />
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
    </div>
  );
}
