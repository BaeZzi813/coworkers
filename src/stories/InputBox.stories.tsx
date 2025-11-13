import { InputBox as InputBoxComponent } from "@/components/input";
import type { Meta } from "@storybook/nextjs";
import { useState } from "react";

const meta = {
  title: "Components/InputBox",
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof InputBoxComponent>;

export default meta;

export function InputBox() {
  const [value, setValue] = useState("제어컴포넌트");

  return (
    <div className="flex w-[300px] flex-col gap-4 text-text-primary placeholder:text-text-default">
      <InputBoxComponent
        size="large"
        placeholder="내용을 입력하세요"
        minHeight={100}
      />
      <InputBoxComponent
        size="small"
        height={200}
        value={value}
        placeholder="내용을 입력하세요"
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
}
