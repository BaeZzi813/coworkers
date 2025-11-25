import { Input } from "@/components/input";

export default function PostHeader({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      <div>
        <span className="text-md-b tablet:text-lg-b">제목</span>
        <span className="ml-0.5 text-status-danger">*</span>
      </div>
      <Input
        size="small"
        onChange={onChange}
        value={value}
        placeholder="제목을 입력해주세요."
      />
    </div>
  );
}
