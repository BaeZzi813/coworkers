import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import { UserGroup } from "@/types/group";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import SidebarMenu from "./SidebarMenu";

interface Props {
  groups: UserGroup[];
  compact?: boolean;
  activeGroupId: number;
}

export default function UserGroupList({
  groups,
  compact = false,
  activeGroupId,
}: Props) {
  const { isMobile } = useResponsive();
  const [openDropdown, setOpenDropdown] = useState(false);

  const handleDropdownClick = () => {
    setOpenDropdown(!openDropdown);
  };

  return (
    <div className="flex flex-col gap-2">
      {isMobile || compact || (
        <Dropdown isOpen={openDropdown} onClick={handleDropdownClick} />
      )}
      {(isMobile || openDropdown) && (
        <ul className="flex max-h-[220px] flex-col overflow-y-scroll tablet:max-h-[292px] tablet:gap-2">
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
      )}
    </div>
  );
}

function Dropdown({
  isOpen,
  onClick,
}: {
  isOpen: boolean;
  onClick?: () => void;
}) {
  return (
    <div
      className="flex cursor-pointer items-center rounded-lg px-4 py-2 hover:bg-state-50"
      onClick={onClick}
    >
      <div className="flex grow items-center gap-3">
        <Icon name="chess" size="small" color="#cbd5e1" />
        <span className="text-lg-s text-state-400">팀 선택</span>
      </div>
      <div className={clsx(isOpen && "rotate-180")}>
        <Icon name="triangleDown" size="small" />
      </div>
    </div>
  );
}
