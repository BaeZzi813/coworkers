import { clsx } from "clsx";
import BaseDatePicker from "./BaseDatePicker";

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
  return (
    <BaseDatePicker
      selected={selected}
      onSelect={onSelect}
      className={className}
      classNames={{
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
