import Icon from "@/components/icon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <>
      <div className="relative flex items-center justify-between">
        <div className="text-2xl-b text-text-primary">자유게시판</div>
        <div className="absolute top-3.5 right-[370px]">
          <Icon name="magnifier" size="large" color="white" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="h-14 w-[420px] rounded-[1000px] border-2 border-brand-primary px-14 focus:outline-none"
        />
      </div>
    </>
  );
}
