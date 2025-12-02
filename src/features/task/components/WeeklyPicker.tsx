import {
  WEEKDAY_LABEL,
  WEEKDAY_ORDER,
} from "@/features/task/constants/weekdays";
import clsx from "clsx";

interface WeeklyPickerProps {
  weekdays: number[];
  onChange: (days: number[]) => void;
}

export default function WeeklyPicker({
  weekdays,
  onChange,
}: WeeklyPickerProps) {
  const toggle = (nextDay: number) => {
    const next = weekdays.includes(nextDay)
      ? weekdays.filter((prevDay) => prevDay !== nextDay)
      : [...weekdays, nextDay];
    onChange(next);
  };

  return (
    <div className="flex gap-2">
      {WEEKDAY_ORDER.map((day) => (
        <button
          key={day}
          type="button"
          onClick={() => toggle(day)}
          className={clsx(
            "flex h-12 w-11 cursor-pointer items-center justify-center rounded-xl border px-2.5 py-2 text-sm-m transition",
            weekdays.includes(day)
              ? "border-brand-primary bg-brand-primary text-text-inverse"
              : "border-border-primary bg-background-primary text-text-default"
          )}
        >
          {WEEKDAY_LABEL[day]}
        </button>
      ))}
    </div>
  );
}
