import { Button } from "@/components/button";
import Icon from "@/components/icon";
import { Alert as AlertComponent } from "@/components/modal";
import type { Meta } from "@storybook/nextjs";

const meta = {
  title: "Components/Modal",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof AlertComponent>;

export default meta;

export function Alert() {
  return (
    <div className="flex gap-8">
      <div className="flex flex-col items-center gap-4 bg-gray-400 p-6">
        <AlertComponent
          title="멤버 초대"
          message="그룹에 참여할 수 있는 링크를 복사합니다."
          actions={[<Button key="alert-close" title="링크 복사하기" />]}
          onClose={() => {}}
        />
        <AlertComponent
          title="할 일 목록"
          content={
            <input
              className="w-full border-border-primary bg-amber-50 p-4"
              placeholder="목록 명을 입력해주세요."
            />
          }
          actions={[<Button key="alert-action" title="만들기" />]}
          onClose={() => {}}
        />
      </div>
      <div className="flex flex-col items-center gap-4 bg-gray-400 p-6">
        <AlertComponent
          title="비밀번호 재설정"
          message="비밀번호 재설정 링크를 보내드립니다."
          content={
            <input
              className="w-full border-border-primary bg-amber-50 p-4"
              placeholder="이메일을 입력하세요."
            />
          }
          actions={[
            <Button key="alert-close" variant="outlinedPrimary" title="닫기" />,
            <Button key="alert-action" title="링크 보내기" />,
          ]}
        />
        <AlertComponent
          title="비밀번호 변경하기"
          content={
            <>
              <input
                className="w-full border-border-primary bg-amber-50 p-4"
                placeholder="새 비밀번호를 입력해주세요."
              />
              <input
                className="mt-2 w-full border-border-primary bg-amber-50 p-4"
                placeholder="새 비밀번호를 다시 한 번 입력해주세요."
              />
            </>
          }
          actions={[
            <Button key="alert-close" variant="outlinedPrimary" title="닫기" />,
            <Button key="alert-action" title="변경하기" />,
          ]}
        />
      </div>
      <div className="flex flex-col items-center gap-4 bg-gray-400 p-6">
        <AlertComponent
          header={<Icon name="alert" />}
          title="회원 탈퇴를 진행하시겠어요?"
          message={`그룹장으로 있는 그룹은  자동으로 삭제되고,\n모든 그룹에서 나가집니다.`}
          actions={[
            <Button
              key="alert-close"
              variant="outlinedSecondary"
              title="닫기"
            />,
            <Button key="alert-action" variant="danger" title="회원 탈퇴" />,
          ]}
        />
        <AlertComponent
          title="로그아웃 하시겠어요?"
          actions={[
            <Button
              key="alert-close"
              variant="outlinedSecondary"
              title="닫기"
            />,
            <Button key="alert-action" variant="danger" title="로그아웃" />,
          ]}
        />
      </div>
    </div>
  );
}
