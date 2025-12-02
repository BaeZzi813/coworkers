import { SelectOption } from "@/components/select";
import { TaskFrequency } from "@/types/task";
import { normalizeDate } from "@/utils/format-date";
import { useMemo, useState } from "react";
import { PostTaskBody } from "../apis";
import { FREQUENCY_LABEL } from "../constants/task-frequency";

type TaskCreateSheetState = PostTaskBody;

export function useTaskForm(groupId: number, taskListId: number) {
  const now = new Date();
  const initialStartDate = normalizeDate(now);

  const [form, setForm] = useState<TaskCreateSheetState>({
    name: "",
    description: "",
    startDate: initialStartDate,
    frequencyType: "ONCE",
    weekDays: undefined,
    monthDay: undefined,
  });

  const [showError, setShowError] = useState({
    name: false,
    monthDay: false,
  });

  const frequencyOptions: SelectOption[] = useMemo(
    () =>
      (Object.keys(FREQUENCY_LABEL) as TaskFrequency[]).map((key) => ({
        label: FREQUENCY_LABEL[key],
        value: key,
      })),
    []
  );

  const frequencySelectValue = frequencyOptions.find(
    (opt) => opt.value === form.frequencyType
  );

  const getSelectedDateTime = () => {
    const date = new Date(form.startDate);
    const datePart = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const timePart = `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
    return { date, datePart, timePart };
  };

  const { date: selectedDate, datePart, timePart } = getSelectedDateTime();

  const errors = useMemo(
    () => ({
      name: form.name.trim() === "" ? "제목을 입력해주세요." : undefined,
      monthDay:
        form.frequencyType === "MONTHLY" &&
        (form.monthDay == null || form.monthDay < 1 || form.monthDay > 31)
          ? "1~31 사이의 숫자를 입력해주세요."
          : undefined,
    }),
    [form.name, form.frequencyType, form.monthDay]
  );

  const isFormInvalid = Boolean(errors.name || errors.monthDay);

  const handleInputChange = <K extends keyof TaskCreateSheetState>(
    key: K,
    value: TaskCreateSheetState[K]
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleInputBlur = (key: keyof typeof showError) => {
    setShowError((prev) => ({ ...prev, [key]: true }));
  };

  const handleFrequencyChange = (opt: SelectOption) => {
    handleInputChange("frequencyType", opt.value as TaskFrequency);
    if (opt.value !== "WEEKLY") handleInputChange("weekDays", undefined);
    if (opt.value !== "MONTHLY") handleInputChange("monthDay", undefined);
  };

  const handleDateSelect = (date?: Date) => {
    if (date) {
      const { date: oldDate } = getSelectedDateTime();
      const newDateWithOldTime = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
        oldDate.getHours(),
        oldDate.getMinutes()
      );
      handleInputChange("startDate", normalizeDate(newDateWithOldTime));
    }
  };

  const handleTimeChange = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    const { date: oldDate } = getSelectedDateTime();
    const newDate = new Date(
      oldDate.getFullYear(),
      oldDate.getMonth(),
      oldDate.getDate(),
      hours,
      minutes
    );
    handleInputChange("startDate", normalizeDate(newDate));
  };

  const handleMonthlyDayChange = (value: string) => {
    if (value === "") {
      handleInputChange("monthDay", undefined);
      return;
    }
    const num = Number(value);
    if (!Number.isNaN(num)) handleInputChange("monthDay", num);
  };

  return {
    form,
    errors,
    showError,
    isFormInvalid,
    frequencyOptions,
    frequencySelectValue,
    selectedDate,
    datePart,
    timePart,
    handleInputChange,
    handleInputBlur,
    handleFrequencyChange,
    handleDateSelect,
    handleTimeChange,
    handleMonthlyDayChange,
    initialGroupId: groupId,
    initialTaskListId: taskListId,
    now,
  };
}
