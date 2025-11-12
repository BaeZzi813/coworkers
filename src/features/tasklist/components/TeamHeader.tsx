import BgTeamPattern from "@/assets/images/bg-team-pattern.png";
import Dropdown, { DropdownOption } from "@/components/dropdown";
import Icon from "@/components/icon";
import Image from "next/image";

interface TeamHeaderProps {
  teamName: string;
  isAdmin?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TeamHeader({
  teamName,
  isAdmin = false,
  onEdit,
  onDelete,
}: TeamHeaderProps) {
  const options: DropdownOption[] = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  const handleSelect = (option: DropdownOption) => {
    switch (option.value) {
      case "edit":
        onEdit?.();
        break;
      case "delete":
        onDelete?.();
        break;
    }
  };

  return (
    <header className="flex h-7 w-full max-w-[1120px] items-center justify-start rounded-xl bg-none shadow-card outline-border-primary desktop:h-16 desktop:justify-between desktop:bg-background-primary desktop:px-7 desktop:py-4 desktop:outline">
      <h1 className="text-lg-b text-text-primary tablet:text-2xl-b">
        {teamName}
      </h1>

      <Image
        src={BgTeamPattern}
        alt=""
        aria-hidden
        width={326}
        height={102}
        className="mr-2.5 ml-auto hidden desktop:block"
      />

      {isAdmin && (
        <Dropdown
          anchor={
            <button
              aria-label="팀 설정 열기"
              className="ml-2 cursor-pointer py-1"
            >
              <Icon name="gear" size="large" />
            </button>
          }
          options={options}
          alignment="left"
          onSelect={(option) => handleSelect(option as DropdownOption)}
        />
      )}
    </header>
  );
}
