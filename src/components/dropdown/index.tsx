import { useBackdropClick } from "@/hooks/use-backdrop-click";
import clsx from "clsx";
import { ReactNode, useState } from "react";

interface Props {
  anchor: ReactNode;
  options: string[];
  gap?: number;
  onSelect: (option: string) => void;
}

export default function Dropdown({
  anchor,
  gap = 8,
  options,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const targetRef = useBackdropClick<HTMLDivElement>({
    callback: () => setIsOpen(false),
  });

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
            "absolute left-0 rounded-xl",
            "border border-border-primary",
            "overflow-hidden",
            "bg-background-primary"
          )}
          style={{ top: `calc(100% + ${gap}px)` }}
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
