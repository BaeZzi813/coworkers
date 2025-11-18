import Dropdown, {
  Alignment,
  Direction,
  DropdownOption,
} from "@/components/dropdown";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const options: DropdownOption[] = [
    {
      label: "마이 히스토리",
      value: "myhistory",
      action: () => console.log("Go to my history"),
    },
    {
      label: "계정 설정",
      value: "mypage",
      action: () => console.log("Go to my page"),
    },
    {
      label: "팀 참여",
      value: "joinTeam",
      action: () => router.push("/jointeam"),
    },
    {
      label: "로그아웃",
      value: "logout",
      action: () => console.log("Go to logout"),
    },
  ];

  return (
    <Dropdown
      anchor={anchor}
      options={options}
      gap={gap}
      direction={direction}
      alignment={alignment}
      alignmentOffset={alignmentOffset}
    />
  );
}
