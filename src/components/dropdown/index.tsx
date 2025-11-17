import { useBackdropClick } from "@/hooks/use-backdrop-click";
import clsx from "clsx";
import { CSSProperties, MouseEvent, ReactNode, useState } from "react";

export type Alignment = "top" | "bottom" | "left" | "right" | "fill";

export type Direction = "top" | "bottom" | "left" | "right";

export interface DropdownOption {
  label: ReactNode;
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

type Edge = Pick<CSSProperties, "top" | "left" | "right" | "bottom">;

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
  const directionValue = `calc(100% + ${gap}px)`;
  const directionStyles: Record<Direction, Edge> = {
    top: { bottom: directionValue },
    bottom: { top: directionValue },
    left: { right: directionValue },
    right: { left: directionValue },
  };

  const isHorizontalDirection = direction === "left" || direction === "right";
  const isVerticalDirection = direction === "top" || direction === "bottom";
  const alignmentStyles: Record<Alignment, Edge> = {
    top: isHorizontalDirection ? { top: alignmentOffset } : {},
    bottom: isHorizontalDirection ? { bottom: alignmentOffset } : {},
    left: isVerticalDirection ? { left: alignmentOffset } : {},
    right: isVerticalDirection ? { right: alignmentOffset } : {},
    fill: isVerticalDirection ? { left: 0, right: 0 } : {},
  };

  return { ...directionStyles[direction], ...alignmentStyles[alignment] };
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

  const handleAnchorClick = (event: MouseEvent) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (
    event: MouseEvent,
    option: DropdownOption | string
  ) => {
    event.stopPropagation();
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
                className="cursor-pointer px-6 py-3.5 text-lg-r whitespace-nowrap hover:bg-background-tertiary"
                onClick={(event) => handleOptionClick(event, option)}
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
