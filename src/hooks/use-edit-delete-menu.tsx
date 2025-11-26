import { DropdownOption } from "@/components/dropdown";
import Icon from "@/components/icon";

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
}

export function useEditDeleteMenu({ onEdit, onDelete }: Props) {
  const anchor = (
    <div
      role="button"
      aria-label="설정 메뉴 열기"
      className="cursor-pointer py-1.5"
    >
      <Icon name="dots" />
    </div>
  );

  const options: DropdownOption[] = [
    { label: "수정하기", value: "edit", action: onEdit ?? (() => {}) },
    { label: "삭제하기", value: "delete", action: onDelete ?? (() => {}) },
  ];

  return { anchor, options };
}
