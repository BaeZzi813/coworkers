import { InputBox } from "@/components/input";

export default function PostContent({ onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-md-b tablet:text-lg-b">내용</span>
        <span className="ml-0.5 text-status-danger">*</span>
      </div>
      <InputBox
        placeholder="내용을 입력하세요"
        onChange={onChange}
        height={200}
      />
    </div>
  );
}
