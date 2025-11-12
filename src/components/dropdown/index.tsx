import { useBackdropClick } from "@/hooks/use-backdrop-click";
import clsx from "clsx";
import { CSSProperties, ReactNode, useState } from "react";

type Alignment = "left" | "right" | "fill";

type Direction = "top" | "bottom";

export interface DropdownOption {
  label: string;
  value: string;
}

interface Props {
  anchor: ReactNode;
  options: DropdownOption[] | string[];
  gap?: number;
  direction?: Direction;
  alignment?: Alignment;
  alignmentOffset?: number;
  onSelect: (option: DropdownOption | string) => void;
}

function layoutStyles({
  gap,
  direction,
  alignment,
  alignmentOffset,
}: {
  gap: number;
  direction: Direction;
  alignment: Alignment;
  alignmentOffset: number;
}) {
  const styles: Pick<CSSProperties, "top" | "left" | "right" | "bottom"> = {};

  switch (direction) {
    case "top":
      styles.bottom = `calc(100% + ${gap}px)`;
      break;
    case "bottom":
      styles.top = `calc(100% + ${gap}px)`;
      break;
  }
  switch (alignment) {
    case "left":
      styles.left = alignmentOffset;
      break;
    case "right":
      styles.right = alignmentOffset;
      break;
    case "fill":
      styles.left = 0;
      styles.right = 0;
      break;
  }

  return styles;
}

export default function Dropdown({
  anchor,
  options,
  gap = 8,
  direction = "bottom",
  alignment = "left",
  alignmentOffset = 0,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useBackdropClick<HTMLDivElement>({
    callback: () => setIsOpen(false),
  });

  const handleAnchorClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: DropdownOption | string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-fit" ref={targetRef}>
      <div onClick={handleAnchorClick}>{anchor}</div>
      {isOpen && (
        <ul
          className={clsx(
            "absolute rounded-xl",
            "border border-border-primary",
            "overflow-hidden",
            "bg-background-primary",
            "z-(--z-overlay)"
          )}
          style={layoutStyles({ gap, direction, alignment, alignmentOffset })}
        >
          {options.map((option) => {
            const key = typeof option === "string" ? option : option.value;
            const label = typeof option === "string" ? option : option.label;
            return (
              <li
                key={key}
                className="text-lg-r cursor-pointer px-6 py-3.5 whitespace-nowrap hover:bg-background-tertiary"
                onClick={() => handleOptionClick(option)}
              >
                {label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
