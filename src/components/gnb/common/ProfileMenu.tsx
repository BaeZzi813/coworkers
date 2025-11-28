import Dropdown, {
  Alignment,
  Direction,
  DropdownOption,
} from "@/components/dropdown";
import { postSignOut } from "@/features/auth/apis";
import { useAuthStore } from "@/stores/auth-store";
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
  const logout = useAuthStore((state) => state.logOut);

  const options: DropdownOption[] = [
    {
      label: "마이 히스토리",
      value: "myhistory",
      action: () => router.push("/myhistory"),
    },
    {
      label: "계정 설정",
      value: "mypage",
      action: () => router.push("/mypage"),
    },
    {
      label: "팀 참여",
      value: "joinTeam",
      action: () => router.push("/jointeam"),
    },
    {
      label: "로그아웃",
      value: "logout",
      action: async () => {
        await postSignOut();
        logout();
        router.replace("/");
      },
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
