import { useBackdropClick } from "@/hooks/use-backdrop-click";
import clsx from "clsx";
import { ReactNode, useState } from "react";

type Alignment = "left" | "right" | "fill";

interface Props {
  anchor: ReactNode;
  options: string[];
  gap?: number;
  alignment?: Alignment;
  alignmentOffset?: number;
  onSelect: (option: string) => void;
}

export default function Dropdown({
  anchor,
  options,
  gap = 8,
  alignment = "left",
  alignmentOffset = 0,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useBackdropClick<HTMLDivElement>({
    callback: () => setIsOpen(false),
  });

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

  const handleAnchorClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={targetRef}>
      <div onClick={handleAnchorClick}>{anchor}</div>
      {isOpen && (
        <ul
          className={clsx(
            "absolute rounded-xl",
            "border border-border-primary",
            "overflow-hidden",
            "bg-background-primary",
            "z-9999"
          )}
          style={alignmentStyles}
        >
          {options.map((option) => (
            <li
              key={option}
              className="text-lg-r cursor-pointer px-6 py-3.5 whitespace-nowrap hover:bg-background-tertiary"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
