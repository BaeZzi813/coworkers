import clsx from "clsx";
import { endOfWeek, isSameDay, startOfWeek } from "date-fns";
import { ko } from "date-fns/locale";
import { DateRange, DayPicker, getDefaultClassNames } from "react-day-picker";
import "react-day-picker/style.css";
import DatePickerChevron from "./DatePickerChevron";

interface DateRangePickerProps {
  range?: DateRange;
  onChange: (range: DateRange) => void;
  className?: string;
}

export default function DateRangePicker({
  range,
  onChange,
  className,
}: DateRangePickerProps) {
  const cx = getDefaultClassNames();

  const handleDayClick = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });
    onChange({ from: start, to: end });
  };

  return (
    <div
      className={clsx(
        "relative flex w-[280px] justify-center border",
        className
      )}
    >
      <DayPicker
        mode="single"
        locale={ko}
        selected={range?.from}
        onDayClick={handleDayClick}
        showOutsideDays
        components={{ Chevron: DatePickerChevron }}
        modifiers={{
          range_start: (day) => !!(range?.from && isSameDay(day, range.from)),
          range_end: (day) => !!(range?.to && isSameDay(day, range.to)),
          range_middle: (day) =>
            !!(range?.from && range?.to && day > range.from && day < range.to),
        }}
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
          selected: "",
          today: "text-brand-primary",
          outside: "text-text-disabled",
          range_start: "bg-brand-primary/50 rounded-l-lg",
          range_middle: "bg-brand-primary/30 rounded-none",
          range_end: "bg-brand-primary/50 rounded-r-lg",
        }}
      />
    </div>
  );
}
