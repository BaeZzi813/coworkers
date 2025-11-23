import { ReactNode } from "react";
import Dropdown, { Alignment, DropdownOption } from ".";

interface Props {
  anchor: ReactNode;
  alignment: Alignment;
  alignmentOffset: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function EditDropdown({
  anchor,
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
      gap={20}
      alignment={alignment}
      alignmentOffset={alignmentOffset}
    />
  );
}
