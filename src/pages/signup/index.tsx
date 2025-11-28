import KakaotalkIcon from "@/assets/icons/ic-kakaotalk.svg";
import { Button } from "@/components/button";
import { Alert, ErrorAlert } from "@/components/modal";
import { postSignUp } from "@/features/auth/apis";
import InputLabel from "@/features/login/components/InputLabel";
import PasswordVisible from "@/features/login/components/PasswordVisible";
import { useAuthStore } from "@/stores/auth-store";
import {
  validateEmail,
  validateName,
  validatePassword,
  validatePasswordConfirm,
} from "@/utils/login-validator";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";
import { FormEvent, useState } from "react";

export default function SignUpPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [nameError, setNameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [confirmedPasswordError, setConfirmedPasswordError] = useState<
    string | undefined
  >();
  const [isEmailErrorModalOpen, setIsEmailErrorModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const validateTotalForm = () => {
    const nameResult = validateName(name);
    const emailResult = validateEmail(email);
    const passwordResult = validatePassword(password);
    const confirmPasswordResult = validatePasswordConfirm(
      password,
      confirmedPassword
    );

    return {
      isValid:
        nameResult.valid &&
        emailResult.valid &&
        passwordResult.valid &&
        confirmPasswordResult.valid,
      errors: {
        nameError: nameResult.valid ? undefined : nameResult.reason,
        emailError: emailResult.valid ? undefined : emailResult.reason,
        passwordError: passwordResult.valid ? undefined : passwordResult.reason,
        confirmedPasswordError: confirmPasswordResult.valid
          ? undefined
          : confirmPasswordResult.reason,
      },
    };
  };

  const validateBlurField = (
    field: "name" | "email" | "password" | "confirmedPassword"
  ) => {
    const blurFieldValidators = {
      name: () => {
        const result = validateName(name);
        setNameError(result.valid ? undefined : result.reason);
      },
      email: () => {
        const result = validateEmail(email);
        setEmailError(result.valid ? undefined : result.reason);
      },
      password: () => {
        const result = validatePassword(password);
        setPasswordError(result.valid ? undefined : result.reason);
      },
      confirmedPassword: () => {
        const result = validatePasswordConfirm(password, confirmedPassword);
        setConfirmedPasswordError(result.valid ? undefined : result.reason);
      },
    };

    blurFieldValidators[field]?.();
  };

  const handleNameBlur = () => {
    validateBlurField("name");
  };

  const handleEmailBlur = () => {
    validateBlurField("email");
  };

  const handlePasswordBlur = () => {
    validateBlurField("password");
  };

  const handleConfirmPasswordBlur = () => {
    validateBlurField("confirmedPassword");
  };

  const router = useRouter();
  const login = useAuthStore((state) => state.logIn);

  const isFormValid = validateTotalForm().isValid;

  const handleSignUpButtonClick = async () => {
    const validation = validateTotalForm();

    setNameError(validation.errors.nameError);
    setEmailError(validation.errors.emailError);
    setPasswordError(validation.errors.passwordError);
    setConfirmedPasswordError(validation.errors.confirmedPasswordError);

    if (!validation.isValid) {
      return;
    }

    try {
      const response = await postSignUp({
        email,
        nickname: name,
        password,
        passwordConfirmation: confirmedPassword,
      });

      overlay.close("email-duplicate-error-alert");
      overlay.unmount("email-duplicate-error-alert");
      setIsEmailErrorModalOpen(false);
      setIsSuccessModalOpen(true);
      overlay.open(
        ({ isOpen, close, unmount }) => (
          <Alert
            isOpen={isOpen}
            onClose={() => {}}
            onExit={() => {
              setIsSuccessModalOpen(false);
              unmount();
            }}
            allowsBackgroundDismiss={false}
            showsCloseButton={false}
            title="회원가입이 완료되었습니다!"
            actions={[
              <Button
                key="move"
                title="팀 페이지로 이동"
                variant="primary"
                size="large"
                isFullWidth={true}
                onClick={() => {
                  login({
                    accessToken: response.accessToken,
                    user: response.user,
                  });
                  close();
                  router.push("/dashboard");
                }}
              />,
            ]}
          />
        ),
        { overlayId: "signup-success-alert" }
      );
    } catch (error) {
      const axiosError = error as {
        response?: {
          status?: number;
          data?: {
            message?: string;
            details?: {
              email?: { message?: string };
            };
            email?: string | { message?: string };
          };
        };
      };

      if (axiosError?.response?.status === 400) {
        const errorData = axiosError.response.data;
        const hasEmailError =
          errorData?.details?.email ||
          errorData?.email ||
          /이메일|email/i.test(errorData?.message || "");

        if (hasEmailError && !isSuccessModalOpen && !isEmailErrorModalOpen) {
          overlay.close("signup-success-alert");
          overlay.unmount("signup-success-alert");
          overlay.close("email-duplicate-error-alert");
          overlay.unmount("email-duplicate-error-alert");

          setIsEmailErrorModalOpen(true);
          overlay.open(
            ({ isOpen, close, unmount }) => (
              <ErrorAlert
                isOpen={isOpen}
                onClose={close}
                onExit={() => {
                  setIsEmailErrorModalOpen(false);
                  unmount();
                }}
                title="이미 사용중인 이메일입니다."
                error={new Error("다른 이메일을 입력해주세요.")}
              />
            ),
            { overlayId: "email-duplicate-error-alert" }
          );
        } else {
          console.error(
            "회원가입 에러:",
            errorData?.message || "회원가입에 실패했습니다."
          );
        }
      } else {
        console.error("회원가입 에러:", error);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary">
      <div className="relative w-[550px] rounded-2xl bg-background-primary">
        <div className="flex flex-col items-center pt-18">
          <h1 className="h-7 w-24 text-2xl-b text-text-primary">회원가입</h1>
        </div>

        <form
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            handleSignUpButtonClick();
          }}
        >
          <div className="mx-auto mt-16 w-[460px]">
            <div className="h-20 w-[460px]">
              <InputLabel
                label="이름"
                id="name"
                type="text"
                placeholder="이름을 입력해주세요."
                size="large"
                value={name}
                onChange={(event) => setName(event.target.value)}
                onBlur={handleNameBlur}
                errorMessage={nameError}
              />
            </div>

            <div className={nameError ? "mt-12" : "mt-6"}>
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

            <div className={passwordError ? "mt-12" : "mt-6"}>
              <div className="h-20 w-[460px]">
                <InputLabel
                  label="비밀번호 확인"
                  id="confirmPassword"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  size="large"
                  value={confirmedPassword}
                  onChange={(event) => setConfirmedPassword(event.target.value)}
                  onBlur={handleConfirmPasswordBlur}
                  errorMessage={confirmedPasswordError}
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

          <div className="mx-auto mt-12 w-[460px]">
            <Button
              title="회원가입"
              variant="primary"
              size="large"
              isFullWidth={true}
              disabled={!isFormValid}
              onClick={handleSignUpButtonClick}
            />
          </div>
        </form>

        <div className="mx-auto mt-[60px] flex h-5 w-[460px] items-center">
          <div className="h-px flex-1 bg-border-primary"></div>
          <span className="px-10 text-xl-r text-text-default">OR</span>
          <div className="h-px flex-1 bg-border-primary"></div>
        </div>

        <div className="mx-auto mt-6 flex h-11 w-[460px] items-center justify-between pb-18">
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
