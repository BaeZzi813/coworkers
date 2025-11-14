import { ReactNode } from "react";
import Dropdown, { DropdownOption } from "../dropdown";

interface Props {
  anchor: ReactNode;
}

export default function ProfileMenu({ anchor }: Props) {
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
      gap={16}
      direction="right"
      alignment="bottom"
      alignmentOffset={16}
      onSelect={(option) => handleSelect(option as DropdownOption)}
    />
  );
}
