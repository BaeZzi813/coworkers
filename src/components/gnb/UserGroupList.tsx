import { UserGroup } from "@/types/user-group";
import Link from "next/link";
import SidebarMenu from "./SidebarMenu";

interface Props {
  groups: UserGroup[];
  compact: boolean;
  activeGroupId: number;
}

export default function UserGroupList({
  groups,
  compact,
  activeGroupId,
}: Props) {
  return (
    <ul className="flex flex-col gap-2">
      {groups.map((group) => (
        <li key={group.id}>
          <Link href={`/${group.id}`}>
            <SidebarMenu
              iconName="chess"
              title={group.name}
              compact={compact}
              active={group.id === activeGroupId}
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
