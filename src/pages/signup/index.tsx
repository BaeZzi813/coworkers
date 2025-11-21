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
import { FormEvent, useState } from "react";

interface InputFormData {
  name: string;
  email: string;
  password: string;
  confirmedPassword: string;
}

const INITIAL_INPUT_FORM_DATA: InputFormData = {
  name: "",
  email: "",
  password: "",
  confirmedPassword: "",
};

interface InputFormError {
  nameError?: string;
  emailError?: string;
  passwordError?: string;
  confirmedPasswordError?: string;
}

export default function SignUpPage() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const [inputFormData, setInputFormData] = useState<InputFormData>(
    INITIAL_INPUT_FORM_DATA
  );
  const [inputFormError, setInputFormError] = useState<InputFormError>({});

  const handleNameBlur = () => {
    const nameResult = validateName(inputFormData.name);
    setInputFormError((prev) => ({
      ...prev,
      nameError: nameResult.valid ? undefined : nameResult.reason,
    }));
  };

  const handleEmailBlur = () => {
    const emailResult = validateEmail(inputFormData.email);
    setInputFormError((prev) => ({
      ...prev,
      emailError: emailResult.valid ? undefined : emailResult.reason,
    }));
  };

  const handlePasswordBlur = () => {
    const passwordResult = validatePassword(inputFormData.password);
    setInputFormError((prev) => ({
      ...prev,
      passwordError: passwordResult.valid ? undefined : passwordResult.reason,
    }));
  };

  const handleConfirmPasswordBlur = () => {
    const confirmPasswordResult = validatePasswordConfirm(
      inputFormData.password,
      inputFormData.confirmedPassword
    );
    setInputFormError((prev) => ({
      ...prev,
      confirmedPasswordError: confirmPasswordResult.valid
        ? undefined
        : confirmPasswordResult.reason,
    }));
  };

  const isFormValid =
    validateName(inputFormData.name).valid &&
    validateEmail(inputFormData.email).valid &&
    validatePassword(inputFormData.password).valid &&
    validatePasswordConfirm(
      inputFormData.password,
      inputFormData.confirmedPassword
    ).valid;

  const handleSignUpButtonClick = () => {
    const nameResult = validateName(inputFormData.name);
    const emailResult = validateEmail(inputFormData.email);
    const passwordResult = validatePassword(inputFormData.password);
    const confirmPasswordResult = validatePasswordConfirm(
      inputFormData.password,
      inputFormData.confirmedPassword
    );

    setInputFormError({
      nameError: nameResult.valid ? undefined : nameResult.reason,
      emailError: emailResult.valid ? undefined : emailResult.reason,
      passwordError: passwordResult.valid ? undefined : passwordResult.reason,
      confirmedPasswordError: confirmPasswordResult.valid
        ? undefined
        : confirmPasswordResult.reason,
    });

    // 회원가입 로직 추가하기
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary">
      <div className="relative w-[550px] rounded-2xl bg-background-primary">
        <div className="flex flex-col items-center pt-18">
          <h1 className="h-7 w-24 text-2xl-b text-text-primary">회원가입</h1>
        </div>

        <form
          onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault();
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
                value={inputFormData.name}
                onChange={(e) =>
                  setInputFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
                onBlur={handleNameBlur}
                errorMessage={inputFormError.nameError}
              />
            </div>

            <div className={inputFormError.nameError ? "mt-12" : "mt-6"}>
              <div className="h-20 w-[460px]">
                <InputLabel
                  label="이메일"
                  id="email"
                  type="email"
                  placeholder="이메일을 입력해주세요."
                  size="large"
                  value={inputFormData.email}
                  onChange={(e) =>
                    setInputFormData((prev) => ({
                      ...prev,
                      email: e.target.value,
                    }))
                  }
                  onBlur={handleEmailBlur}
                  errorMessage={inputFormError.emailError}
                />
              </div>
            </div>

            <div className={inputFormError.emailError ? "mt-12" : "mt-6"}>
              <div className="h-20 w-[460px]">
                <InputLabel
                  label="비밀번호"
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  size="large"
                  value={inputFormData.password}
                  onChange={(e) =>
                    setInputFormData((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  onBlur={handlePasswordBlur}
                  errorMessage={inputFormError.passwordError}
                  trailing={
                    <PasswordVisible
                      isVisible={isPasswordVisible}
                      onToggle={() => setIsPasswordVisible(!isPasswordVisible)}
                    />
                  }
                />
              </div>
            </div>

            <div className={inputFormError.passwordError ? "mt-12" : "mt-6"}>
              <div className="h-20 w-[460px]">
                <InputLabel
                  label="비밀번호 확인"
                  id="confirmPassword"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  placeholder="비밀번호를 다시 한 번 입력해주세요."
                  size="large"
                  value={inputFormData.confirmedPassword}
                  onChange={(e) =>
                    setInputFormData((prev) => ({
                      ...prev,
                      confirmedPassword: e.target.value,
                    }))
                  }
                  onBlur={handleConfirmPasswordBlur}
                  errorMessage={inputFormError.confirmedPasswordError}
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
              disabled={!isFormValid} //click event 예외처리 코드 리팩토링
              onClick={handleSignUpButtonClick}
            />
            {/* 회원가입 완료시 로그인 페이지로 이동하게 만들기 (스웨거에 api는 나오지만 로그인때 생성되는 토큰만 사용) */}
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
