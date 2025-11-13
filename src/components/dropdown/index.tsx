import { useBackdropClick } from "@/hooks/use-backdrop-click";
import clsx from "clsx";
<<<<<<< HEAD
import { ReactNode, useState } from "react";

type Alignment = "left" | "right" | "fill";
=======
import { CSSProperties, ReactNode, useState } from "react";

type Alignment = "top" | "bottom" | "left" | "right" | "fill";

type Direction = "top" | "bottom" | "left" | "right";
>>>>>>> origin/develop

export interface DropdownOption {
  label: string;
  value: string;
}

interface Props {
  anchor: ReactNode;
  options: DropdownOption[] | string[];
  gap?: number;
<<<<<<< HEAD
=======
  direction?: Direction;
>>>>>>> origin/develop
  alignment?: Alignment;
  alignmentOffset?: number;
  onSelect: (option: DropdownOption | string) => void;
}

<<<<<<< HEAD
=======
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

>>>>>>> origin/develop
export default function Dropdown({
  anchor,
  options,
  gap = 8,
<<<<<<< HEAD
=======
  direction = "bottom",
>>>>>>> origin/develop
  alignment = "left",
  alignmentOffset = 0,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useBackdropClick<HTMLDivElement>({
    callback: () => setIsOpen(false),
  });

<<<<<<< HEAD
  const alignmentStyles = { top: `calc(100% + ${gap}px)` };
  switch (alignment) {
    case "left":
      Object.assign(alignmentStyles, { left: alignmentOffset });
      break;
    case "right":
      Object.assign(alignmentStyles, { right: alignmentOffset });
      break;
    case "fill":
      Object.assign(alignmentStyles, { left: 0, right: 0 });
      break;
  }

=======
>>>>>>> origin/develop
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
<<<<<<< HEAD
          style={alignmentStyles}
=======
          style={layoutStyles({ gap, direction, alignment, alignmentOffset })}
>>>>>>> origin/develop
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
