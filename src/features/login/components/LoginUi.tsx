import InvisibleIcon from "@/assets/icons/ic-invisible.svg";
import KakaotalkIcon from "@/assets/icons/ic-kakaotalk.svg";
import VisibleIcon from "@/assets/icons/ic-visible.svg";
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { useState } from "react";

export default function LoginUi() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary">
      <div className="relative h-[720px] w-[550px] rounded-2xl bg-background-primary">
        <div className="px-[243.5px] pt-[72px]">
          <h1 className="h-[28px] w-[72px] text-2xl-b text-text-primary">
            로그인
          </h1>
        </div>

        <div className="mx-auto mt-[64px] h-[182px] w-[460px]">
          <div className="h-[79px] w-[460px]">
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="text-lg-m text-text-primary">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                size="large"
              />
            </div>
          </div>

          <div className="mt-6">
            <div className="h-[79px] w-[460px]">
              <div className="flex flex-col gap-3">
                <label
                  htmlFor="password"
                  className="text-lg-m text-text-primary"
                >
                  비밀번호
                </label>
                <Input
                  id="password"
                  type={isPasswordVisible ? "text" : "password"}
                  placeholder="비밀번호를 입력해주세요."
                  size="large"
                  trailing={
                    <button
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      className="flex cursor-pointer items-center justify-center"
                      aria-label={
                        isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 보기"
                      }
                    >
                      {isPasswordVisible ? (
                        <VisibleIcon width={28} height={24} />
                      ) : (
                        <InvisibleIcon width={28} height={24} />
                      )}
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-3 flex w-[460px] justify-end">
          <button
            type="button"
            className="h-6 w-[174px] cursor-pointer text-right text-lg-m text-brand-primary underline hover:text-lg-s"
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
            onClick={() => {
              // 로그인 로직 추가하기
            }}
          />
        </div>

        <div className="mx-auto mt-6 flex h-[19px] w-[268px] items-center justify-center gap-4">
          <span className="text-lg-m text-text-secondary">
            아직 계정이 없으신가요?
          </span>
          <button
            type="button"
            className="cursor-pointer text-lg-m text-brand-primary underline hover:text-lg-s"
          >
            가입하기
          </button>
        </div>

        <div className="mx-auto mt-[60px] flex h-[19px] w-[460px] items-center">
          <div className="h-px flex-1 bg-border-primary"></div>
          <span className="px-6 text-xl-r text-text-default">OR</span>
          <div className="h-px flex-1 bg-border-primary"></div>
        </div>

        <div className="mx-auto mt-6 flex h-[42px] w-[460px] items-center justify-between pb-[70px]">
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
