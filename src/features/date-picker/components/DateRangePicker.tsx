import { endOfWeek, isSameDay, startOfWeek } from "date-fns";
import { DateRange } from "react-day-picker";
import BaseDatePicker from "./BaseDatePicker";

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
  const handleDayClick = (date: Date) => {
    const start = startOfWeek(date, { weekStartsOn: 1 });
    const end = endOfWeek(date, { weekStartsOn: 1 });
    onChange({ from: start, to: end });
  };

  return (
    <BaseDatePicker
      selected={range?.from}
      onDayClick={handleDayClick}
      className={className}
      modifiers={{
        range_start: (day) => !!(range?.from && isSameDay(day, range.from)),
        range_middle: (day) =>
          !!(range?.from && range?.to && day > range.from && day < range.to),
        range_end: (day) => !!(range?.to && isSameDay(day, range.to)),
      }}
      rdpClassNames={{
        range_start: "bg-brand-primary/50 rounded-l-lg",
        range_middle: "bg-brand-primary/30 rounded-none",
        range_end: "bg-brand-primary/50 rounded-r-lg",
        today: "text-brand-primary",
        selected: "",
      }}
    />
  );
}
