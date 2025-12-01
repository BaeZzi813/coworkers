import { clsx } from "clsx";
import { Matcher } from "react-day-picker";
import BaseDatePicker from "./BaseDatePicker";

interface DatePickerProps {
  selected?: Date;
  onSelect?: (date?: Date) => void;
  disabled?: Matcher | Matcher[];
  className?: string;
}

export default function DatePicker({
  selected,
  onSelect,
  disabled,
  className,
}: DatePickerProps) {
  return (
    <BaseDatePicker
      selected={selected}
      onSelect={onSelect}
      disabled={disabled}
      className={className}
      rdpClassNames={{
        selected:
          "bg-brand-primary text-background-primary text-md-m rounded-lg",
        today: clsx(
          "[&:not(.rdp-outside)]:text-brand-primary",
          "data-[selected=true]:text-background-primary",
          "data-[selected=true]:[&:not(.rdp-outside)]:text-background-primary"
        ),
      }}
    />
  );
}
