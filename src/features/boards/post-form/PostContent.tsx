import { InputBox } from "@/components/input";
import { ChangeEventHandler } from "react";

interface Props {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
}

export default function PostContent({ value, onChange }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-md-b tablet:text-lg-b">내용</span>
        <span className="ml-0.5 text-status-danger">*</span>
      </div>
      <InputBox
        placeholder="내용을 입력하세요"
        value={value}
        onChange={onChange}
        height={200}
      />
    </div>
  );
}
