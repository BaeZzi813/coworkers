import { InputBox as InputBoxComponent } from "@/components/input";
import type { Meta } from "@storybook/nextjs";

const meta = {
  title: "Components/InputBox",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputBoxComponent>;

export default meta;

export function InputBox() {
  return (
    <div className="flex w-[300px] flex-col gap-4 text-text-primary placeholder:text-text-default">
      <InputBoxComponent size="large" placeholder="내용을 입력하세요" />
      <InputBoxComponent
        size="small"
        height={200}
        placeholder="내용을 입력하세요"
      />
    </div>
  );
}
