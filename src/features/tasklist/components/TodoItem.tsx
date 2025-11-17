import Dropdown, { DropdownOption } from "@/components/dropdown";
import Icon from "@/components/icon";
import { TaskFrequency } from "@/types/task";
import clsx from "clsx";
import { MouseEvent } from "react";
import { FREQUENCY_LABEL } from "../constants/task-frequency";

const spanStyle = "text-xs leading-4 text-text-default no-underline";
const itemStyle = {
  container: {
    base: "bg-background-primary border border-border-primary",
    selected: "bg-state-50 border border-brand-primary",
    done: "bg-background-secondary border border-background-secondary",
    selectedDone: "bg-background-secondary border border-brand-primary",
  },
  text: {
    base: "text-text-primary",
    selected: "text-text-primary",
    done: "text-text-disabled  line-through",
    selectedDone: "text-text-disabled line-through",
  },
};

interface TodoItemProps {
  title: string;
  commentCount: number;
  createdAt: string;
  frequency: TaskFrequency;
  isSelected?: boolean;
  isDone?: boolean;
  onToggleDone?: () => void;
  onItemClick?: () => void;
}

export default function TodoItem({
  title,
  commentCount,
  createdAt,
  frequency = "ONCE",
  isSelected = false,
  isDone = false,
  onToggleDone,
  onItemClick,
}: TodoItemProps) {
  const options: DropdownOption[] = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  const handleSelect = (option: DropdownOption) => {
    switch (option.value) {
      case "edit":
        break;
      case "delete":
        break;
    }
  };

  const handleCheckboxClick = (e: MouseEvent) => {
    e.stopPropagation();
    onToggleDone?.();
  };

  return (
    <div
      onClick={onItemClick}
      className={clsx(
        "flex w-full cursor-pointer flex-col gap-2.5 rounded-lg px-3.5 py-3",
        !isSelected && !isDone && itemStyle.container.base,
        isSelected && !isDone && itemStyle.container.selected,
        !isSelected && isDone && itemStyle.container.done,
        isSelected && isDone && itemStyle.container.selectedDone
      )}
    >
      <div className="flex justify-start gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={handleCheckboxClick}
            className="cursor-pointer"
            aria-label={isDone ? "할일 완료 취소하기" : "할일 완료하기"}
          >
            <Icon
              name={isDone ? "checkboxCheck" : "checkbox"}
              size="small"
              color="transparent"
            />
          </button>
          <p
            className={clsx(
              "line-clamp-1 text-md-r",
              !isSelected && !isDone && itemStyle.text.base,
              isSelected && !isDone && itemStyle.text.selected,
              !isSelected && isDone && itemStyle.text.done,
              isSelected && isDone && itemStyle.text.selectedDone
            )}
          >
            {title}
          </p>
        </div>
        <div className="flex items-center gap-0.5">
          <Icon name="comment" size="large" />
          <span className={spanStyle}>{commentCount}</span>
        </div>
        <div className="ml-auto">
          <Dropdown
            anchor={
              <div
                role="button"
                aria-label="할일 설정 열기"
                className="cursor-pointer"
              >
                <Icon name="dots" size="small" />
              </div>
            }
            options={options}
            alignment="right"
            onSelect={(option) => handleSelect(option as DropdownOption)}
          />
        </div>
      </div>
      <div className="flex items-center justify-start gap-2.5">
        <div className="flex items-center gap-1.5">
          <Icon name="calendar" size="large" />
          <span className={spanStyle}>{createdAt}</span>
        </div>

        <div className="h-2 w-px bg-slate-700"></div>

        <div className="flex items-center gap-1.5">
          <Icon name="repeat" size="large" color="transparent" />
          <span className={spanStyle}>{FREQUENCY_LABEL[frequency]}</span>
        </div>
      </div>
    </div>
  );
}
