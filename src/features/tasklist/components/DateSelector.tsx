import { DatePicker } from "@/features/date-picker";
import { useState } from "react";
import DateNav from "./DateNav";
import DateTabs from "./DateTabs";

interface DateSelectorProps {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
}

export default function DateSelector({
  selectedDate,
  onSelectDate,
}: DateSelectorProps) {
  const [openCalendar, setOpenCalendar] = useState(false);

  const handlePrevMonth = () => {
    const date = new Date(selectedDate);
    date.setMonth(date.getMonth() - 1);
    date.setDate(1);

    onSelectDate(date);
  };

  const handleNextMonth = () => {
    const date = new Date(selectedDate);
    date.setMonth(date.getMonth() + 1);
    date.setDate(1);

    onSelectDate(date);
  };

  return (
    <div className="relative flex flex-col gap-4">
      <DateNav
        selectedDate={selectedDate}
        onPrev={handlePrevMonth}
        onNext={handleNextMonth}
        onOpenCalendar={() => setOpenCalendar((prev) => !prev)}
      />

      {openCalendar && (
        <div className="absolute top-8 right-0 z-999 rounded-xl border border-border-primary bg-background-primary p-2 shadow-lg">
          <DatePicker
            selected={selectedDate}
            onSelect={(date) => {
              if (date) {
                onSelectDate(date);
              }
              setOpenCalendar(false);
            }}
          />
        </div>
      )}

      <DateTabs selectedDate={selectedDate} onSelect={onSelectDate} />
    </div>
  );
}
