import DoneBadge from "@/components/badge/DoneBadge";
import Dropdown, { DropdownOption } from "@/components/dropdown";
import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import { Task } from "@/types/task";
import clsx from "clsx";
import { useRef } from "react";

interface TaskItemProps {
  title: string;
  tasks: Task[];
  onClick: () => void;
}

export default function TaskItem({ title, tasks, onClick }: TaskItemProps) {
  const isDropdownClickRef = useRef(false);
  const { isDesktop } = useResponsive();

  const totalCount = tasks.length;
  const doneCount = tasks.filter((task) => task.doneAt).length;

  const options: DropdownOption[] = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  const handleSelect = (option: DropdownOption) => {
    isDropdownClickRef.current = true;

    switch (option.value) {
      case "edit":
        break;
      case "delete":
        break;
    }
  };

  const handleItemClick = () => {
    if (isDropdownClickRef.current) {
      isDropdownClickRef.current = false;
      return;
    }
    onClick?.();
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-start",
        isDesktop &&
          "h-[54px] cursor-pointer rounded-xl border border-border-primary pr-3 pl-5"
      )}
      onClick={handleItemClick}
    >
      <span className="text-sm-s desktop:text-md-s">{title}</span>
      <div className="desktop:ml-auto">
        <DoneBadge current={doneCount} total={totalCount} size="small" />
      </div>
      {isDesktop && (
        <Dropdown
          anchor={
            <div
              role="button"
              aria-label="댓글 설정 열기"
              className="cursor-pointer py-1.5"
              onClick={() => {
                isDropdownClickRef.current = true;
              }}
            >
              <Icon name="dots" size="large" />
            </div>
          }
          options={options}
          alignment="right"
          onSelect={(option) => handleSelect(option as DropdownOption)}
        />
      )}
    </div>
  );
}
