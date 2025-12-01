import { TaskFrequency } from "@/types/task";

export const FREQUENCY_LABEL: Record<TaskFrequency, string> = {
  ONCE: "반복 없음",
  DAILY: "매일 반복",
  WEEKLY: "주 반복",
  MONTHLY: "월 반복",
};
