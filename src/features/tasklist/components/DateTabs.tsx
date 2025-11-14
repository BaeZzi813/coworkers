import clsx from "clsx";
import { motion } from "motion/react";
import { useState } from "react";

interface DateTabsProps {
  selectedDate: Date;
  onSelect: (date: Date) => void;
  rangeStart?: Date;
  rangeEnd?: Date;
}

const WEEKDAYS = ["일", "월", "화", "수", "목", "금", "토"];

const SLOT_COUNT = 7;
const CENTER_INDEX = Math.floor(SLOT_COUNT / 2);

// selectedDate 중앙 기준 7칸 생성
function getSlotDates(selected: Date) {
  return Array.from({ length: SLOT_COUNT }, (_, i) => {
    const date = new Date(selected);
    date.setDate(selected.getDate() + (i - CENTER_INDEX));
    return date;
  });
}

function isSameDay(dateA: Date, dateB: Date) {
  return (
    dateA.getFullYear() === dateB.getFullYear() &&
    dateA.getMonth() === dateB.getMonth() &&
    dateA.getDate() === dateB.getDate()
  );
}

export default function DateTabs({ selectedDate, onSelect }: DateTabsProps) {
  const [direction, setDirection] = useState<"prev" | "next" | null>(null);
  const dates = getSlotDates(selectedDate);

  const handleSelect = (date: Date) => {
    if (date > selectedDate) setDirection("next");
    else if (date < selectedDate) setDirection("prev");
    onSelect(date);
  };

  return (
    <div className="flex items-center gap-1 py-2 tablet:gap-2">
      <motion.div
        key={selectedDate.getTime()}
        initial={{ x: direction === "next" ? 80 : -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: direction === "next" ? -80 : 80, opacity: 0 }}
        transition={{
          duration: 0.28,
          ease: [0.22, 1, 0.36, 1], // spring-like easing
        }}
        className="flex w-full items-center gap-1 tablet:gap-2"
      >
        {dates.map((date) => {
          const isSelected = isSameDay(date, selectedDate);
          const day = WEEKDAYS[date.getDay()];
          const dayNum = date.getDate();

          return (
            <button
              key={date.toISOString()}
              onClick={() => handleSelect(date)}
              className={clsx(
                "flex w-full cursor-pointer flex-col items-center justify-center rounded-xl py-2 tablet:px-4 tablet:py-3",
                isSelected
                  ? "bg-slate-800 text-text-inverse"
                  : "border border-border-primary bg-background-primary text-text-primary"
              )}
            >
              <span
                className={clsx(
                  "text-xs font-medium",
                  isSelected ? "text-text-inverse" : "text-text-default"
                )}
              >
                {day}
              </span>
              <span
                className={clsx(
                  "text-sm-s tablet:text-xl-s",
                  isSelected ? "text-text-inverse" : "text-text-primary"
                )}
              >
                {dayNum}
              </span>
            </button>
          );
        })}
      </motion.div>
    </div>
  );
}
