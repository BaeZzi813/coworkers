import { ReactNode } from "react";
import Dropdown, { Alignment, DropdownOption } from ".";

interface Props {
  anchor: ReactNode;
  gap?: number;
  alignment?: Alignment;
  alignmentOffset?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function EditDropdown({
  anchor,
  gap,
  alignment,
  alignmentOffset,
  onEdit,
  onDelete,
}: Props) {
  const options: DropdownOption[] = [
    { label: "수정하기", value: "edit", action: onEdit },
    { label: "삭제하기", value: "delete", action: onDelete },
  ];
  return (
    <Dropdown
      anchor={anchor}
      options={options}
      width={120}
      gap={gap}
      alignment={alignment}
      alignmentOffset={alignmentOffset}
    />
  );
}
