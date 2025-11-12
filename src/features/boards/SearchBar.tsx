import Icon from "@/components/icon";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <>
      <div className="relative mt-[25px] flex h-[92px] w-[343px] flex-col gap-5 tablet:mt-[77px] tablet:h-14 tablet:w-[620px] tablet:flex-row tablet:items-center tablet:justify-between desktop:mt-[87px] desktop:w-[1120px]">
        <div className="text-xl-b tablet:text-2xl-b text-text-primary">
          자유게시판
        </div>
        <div className="absolute top-13.5 left-3 tablet:top-3.5 tablet:left-[215px] desktop:left-[715px]">
          <Icon name="magnifier" size="large" color="white" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="검색어를 입력해주세요"
          className="h-12 w-[343px] rounded-[1000px] border-2 border-brand-primary pl-12 focus:outline-none tablet:h-14 tablet:w-[420px]"
        />
      </div>
    </>
  );
}
