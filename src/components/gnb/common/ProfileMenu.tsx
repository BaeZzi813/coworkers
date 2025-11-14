import Dropdown, {
  Alignment,
  Direction,
  DropdownOption,
} from "@/components/dropdown";
import { ReactNode } from "react";

interface Props {
  anchor: ReactNode;
  gap?: number;
  alignment?: Alignment;
  direction?: Direction;
  alignmentOffset?: number;
}

export default function ProfileMenu({
  anchor,
  gap,
  alignment,
  direction,
  alignmentOffset,
}: Props) {
  const options: DropdownOption[] = [
    { label: "마이 히스토리", value: "myhistory" },
    { label: "계정 설정", value: "mypage" },
    { label: "팀 참여", value: "joinTeam" },
    { label: "로그아웃", value: "logout" },
  ];

  const handleSelect = (option: DropdownOption) => {
    console.log("Selected option:", option);
  };

  return (
    <Dropdown
      anchor={anchor}
      options={options}
      gap={gap}
      direction={direction}
      alignment={alignment}
      alignmentOffset={alignmentOffset}
      onSelect={(option) => handleSelect(option as DropdownOption)}
    />
  );
}
