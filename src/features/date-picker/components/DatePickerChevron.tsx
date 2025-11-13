import Icon from "@/components/icon";
import clsx from "clsx";
import { JSX } from "react";

interface DatePickerChevronProps {
  className?: string;
  disabled?: boolean;
  orientation?: "up" | "down" | "left" | "right";
}

export default function DatePickerChevron({
  className,
  disabled,
  orientation = "right",
}: DatePickerChevronProps): JSX.Element {
  const baseStyle = clsx(
    `cursor-pointer`,
    disabled ? "opacity-30" : "opacity-100",
    className ?? ""
  );
  const rotateStyle = {
    up: "rotate-180",
    down: "",
    left: "rotate-90",
    right: "rotate-270",
  };

  return (
    <span className={clsx(baseStyle, rotateStyle[orientation])}>
      <Icon name="triangleDown" size="large" />
    </span>
  );
}
