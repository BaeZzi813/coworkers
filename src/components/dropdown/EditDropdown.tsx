import { ReactNode } from "react";
import Dropdown, { Alignment, Direction, DropdownOption } from ".";

interface Props {
  anchor: ReactNode;
  gap?: number;
  direction?: Direction;
  alignment?: Alignment;
  alignmentOffset?: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function EditDropdown({
  anchor,
  gap,
  direction,
  alignment,
  alignmentOffset,
  onEdit,
  onDelete,
}: Props) {
  const options: DropdownOption[] = [];

  if (onEdit) {
    options.push({ label: "수정하기", value: "edit", action: onEdit });
  }

  if (onDelete) {
    options.push({ label: "삭제하기", value: "delete", action: onDelete });
  }

  return (
    <Dropdown
      anchor={anchor}
      options={options}
      width={120}
      gap={gap}
      direction={direction}
      alignment={alignment}
      alignmentOffset={alignmentOffset}
    />
  );
}
