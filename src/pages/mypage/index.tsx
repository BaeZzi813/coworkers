import SecessionIcon from "@/assets/icons/ic-secession.svg";
import { Button } from "@/components/button";
import InputLabel from "@/features/login/components/InputLabel";
import TeamEditImageInput from "@/features/team/components/TeamEditImageInput";
import { useState } from "react";

export default function MyPage() {
  const [name, setName] = useState("찬민테스트");
  const [email] = useState("chanmin@text.com");
  const [password, setPassword] = useState("테스트 비밀번호");

  return (
    <div className="flex min-h-screen items-center justify-center bg-background-secondary">
      <div className="relative h-187 w-235 rounded-2xl border border-border-primary bg-background-primary">
        <div className="absolute top-16 left-14 h-6 w-27">
          <h1 className="text-2xl-b text-text-primary">계정 설정</h1>
        </div>

        <div className="absolute top-32 left-1/2 -translate-x-1/2">
          <TeamEditImageInput
            onChange={(file) => {
              console.log(file);
            }}
          />
        </div>

        <div className="absolute top-72 left-18 h-71 w-198">
          <div className="flex flex-col gap-6">
            <div className="h-20">
              <InputLabel
                label="이름"
                id="name"
                type="text"
                placeholder="이름을 입력해주세요."
                size="large"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="h-20">
              <InputLabel
                label="이메일"
                id="email"
                type="email"
                placeholder="이메일을 입력해주세요."
                size="large"
                value={email}
                disabled
              />
            </div>

            <div className="h-20">
              <InputLabel
                label="비밀번호"
                id="password"
                type="password"
                placeholder="비밀번호를 입력해주세요."
                size="large"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                trailing={
                  <Button
                    title="변경하기"
                    variant="primary"
                    size="small"
                    isFullWidth={false}
                    onClick={() => console.log("비밀번호 변경")}
                  />
                }
              />
            </div>

            <div className="mt-1 flex items-center gap-2">
              <button className="flex h-6 w-32 cursor-pointer items-center text-left text-lg-m text-status-danger hover:text-lg-s hover:underline">
                <SecessionIcon width={24} height={24} />
                회원 탈퇴하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
