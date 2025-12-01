import Icon from "@/components/icon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative flex h-[92px] w-[343px] flex-col gap-5 tablet:h-14 tablet:w-[620px] tablet:flex-row tablet:items-center tablet:justify-between desktop:w-full desktop:max-w-[1120px]">
      <div className="text-xl-b text-text-primary tablet:text-2xl-b">
        자유게시판
      </div>
      <div className="relative">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="h-12 w-[343px] rounded-full border-2 border-brand-primary pl-12 focus:outline-none tablet:h-14 tablet:w-[420px]"
        />
        <div className="absolute top-2.5 left-3.5 tablet:top-3.5 tablet:left-[15px] desktop:left-[15px]">
          <Icon name="magnifier" size="large" color="white" />
        </div>
      </div>
    </div>
  );
}
