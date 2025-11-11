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
  switch (orientation) {
    case "up":
      return (
        <button className={clsx(baseStyle, "rotate-180")}>
          <Icon name="triangleDown" size="large" />
        </button>
      );
    case "down":
      return (
        <span className={clsx(baseStyle)}>
          <Icon name="triangleDown" size="large" />
        </span>
      );
    case "left":
      return (
        <span className={clsx(baseStyle, "rotate-90")}>
          <Icon name="triangleDown" size="large" />
        </span>
      );
    case "right":
      return (
        <span className={clsx(baseStyle, "rotate-270")}>
          <Icon name="triangleDown" size="large" />
        </span>
      );
    default:
      return <></>;
  }
}
