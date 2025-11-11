import clsx from "clsx";
import { ko } from "date-fns/locale";
import { DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import DatePickerChevron from "./DatePickerChevron";

interface DatePickerProps {
  selected?: Date;
  onSelect?: (date?: Date) => void;
  className?: string;
}

export default function DatePicker({
  selected,
  onSelect,
  className,
}: DatePickerProps) {
  const cx = getDefaultClassNames();

  return (
    <div
      className={clsx(
        "relative top-8 flex w-[250px] justify-center border",
        className
      )}
    >
      <DayPicker
        mode="single"
        locale={ko}
        selected={selected}
        onSelect={onSelect}
        showOutsideDays
        components={{ Chevron: DatePickerChevron }}
        style={
          {
            "--rdp-accent-color": "var(--color-brand-primary)",
            "--rdp-day-height": "32px",
            "--rdp-day-width": "32px",
            "--rdp-day_button-height": "30px",
            "--rdp-day_button-width": "100%",
            "--rdp-day_button-border-radius": "8px",
            "--rdp-nav_button-height": "34px",
            "--rdp-nav_button-width": "34px",
            "--rdp-nav-height": "34px",
          } as React.CSSProperties
        }
        classNames={{
          root: clsx(cx.root, "w-full text-md-r text-text-primary"),
          nav: clsx(cx.nav, "justify-between w-full"),
          month_caption: "flex items-center justify-center h-[34px] text-md-m",
          months: clsx(cx.chevron, "max-w-full w-full"),
          month_grid: clsx(cx.month_grid, "w-full"),
          weekday: "text-text-disabled text-md-m w-8 h-8 text-center",
          selected:
            "bg-brand-primary text-background-primary text-md-m rounded-lg ",
          today: clsx(
            "[&:not(.rdp-outside)]:text-brand-primary",
            "data-[selected=true]:text-background-primary",
            "data-[selected=true]:[&:not(.rdp-outside)]:text-background-primary"
          ),
          outside: "text-text-disabled",
        }}
      />
    </div>
  );
}
