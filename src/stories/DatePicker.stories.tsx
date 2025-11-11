import { DatePicker, DateRangePicker } from "@/features/date-picker";
import type { Meta } from "@storybook/nextjs";
import { endOfWeek, startOfWeek } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

const meta = {
  title: "Components/DatePicker",
  component: DatePicker,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DatePicker>;

export default meta;

// 단일 날짜 선택
export function DatePickerStory() {
  const [selected, setSelected] = useState<Date>();

  return <DatePicker selected={selected} onSelect={setSelected} />;
}

// 주간 범위 선택
export const DateRangePickerStory = () => {
  const [range, setRange] = useState<DateRange | undefined>({
    from: startOfWeek(new Date(), { weekStartsOn: 1 }),
    to: endOfWeek(new Date(), { weekStartsOn: 1 }),
  });

  return <DateRangePicker range={range} onChange={setRange} />;
};
