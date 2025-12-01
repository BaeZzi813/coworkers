import DoneBadge from "@/components/badge/DoneBadge";
import Dropdown, { DropdownOption } from "@/components/dropdown";
import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import { Task } from "@/types/task";
import clsx from "clsx";

interface Props {
  title: string;
  tasks: Task[];
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function TaskListGroupItem({
  title,
  tasks,
  onClick,
  onEdit,
  onDelete,
}: Props) {
  const { isDesktop } = useResponsive();

  const hasTask = tasks.length > 0;
  const totalCount = tasks.length;
  const doneCount = tasks.filter((task) => task.doneAt).length;

  const options: DropdownOption[] = [
    { label: "수정하기", value: "edit", action: onEdit },
    { label: "삭제하기", value: "delete", action: onDelete },
  ];

  return (
    <div
      className={clsx(
        "flex items-center justify-start bg-background-primary",
        isDesktop &&
          "h-[54px] cursor-pointer rounded-xl border border-border-primary pr-3 pl-5"
      )}
      onClick={onClick}
    >
      <span className="text-sm-s desktop:text-md-s">{title}</span>
      <div className="desktop:ml-auto">
        <DoneBadge current={doneCount} total={totalCount} size="small" />
      </div>
      {isDesktop && hasTask && (
        <Dropdown
          anchor={
            <div
              role="button"
              aria-label="댓글 설정 열기"
              className="cursor-pointer py-1.5"
            >
              <Icon name="dots" size="large" />
            </div>
          }
          options={options}
          alignment="right"
        />
      )}
    </div>
  );
}
