import { Button } from "@/components/button";
import { Input, InputBox, TextField } from "@/components/input";
import { Sheet } from "@/components/modal";
import Select from "@/components/select";
import { DatePicker } from "@/features/date-picker";
import { overlay } from "overlay-kit";
import { useState } from "react";
import { FREQUENCY_LABEL } from "../constants/task-frequency";
import { useTaskForm } from "../hooks/useTaskForm";
import { useTaskMutation } from "../query";
import WeeklyPicker from "./WeeklyPicker";

interface Props {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;
  groupId: number;
  taskListId: number;
}

export default function TaskCreateSheet({
  isOpen,
  close,
  unmount,
  groupId,
  taskListId,
}: Props) {
  const {
    form,
    errors,
    showError,
    isFormInvalid,
    frequencyOptions,
    frequencySelectValue,
    selectedDate,
    datePart,
    timePart,
    now,
    handleInputChange,
    handleInputBlur,
    handleFrequencyChange,
    handleDateSelect,
    handleTimeChange,
    handleMonthlyDayChange,
  } = useTaskForm(groupId, taskListId);

  const { postMutation } = useTaskMutation({ groupId, taskListId });

  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const handleDatePickerOpen = () => {
    setIsDatePickerOpen((prev) => !prev);
  };

  const handleSubmit = () => {
    if (isFormInvalid) return;

    postMutation.mutate(form, {
      onSuccess: () => {
        close();
      },
    });
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={close}
      onExit={unmount}
      title="할 일 만들기"
      message="할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다."
      content={
        <div className="flex max-h-[calc(100svh-320px)] flex-col gap-6 overflow-y-auto">
          <Sheet.Section title="할 일 제목">
            <TextField
              placeholder="할 일 제목을 입력해주세요."
              value={form.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              onBlur={() => handleInputBlur("name")}
              errorMessage={showError.name ? errors.name : undefined}
            />
          </Sheet.Section>

          <Sheet.Section title="시작 날짜 및 시간">
            <div className="flex gap-2">
              <div className="flex-5/8">
                <Input
                  readOnly
                  placeholder={datePart}
                  onClick={handleDatePickerOpen}
                />
              </div>
              <div className="flex-3/8">
                <Input
                  type="time"
                  value={timePart}
                  onChange={(e) => handleTimeChange(e.target.value)}
                />
              </div>
            </div>

            {isDatePickerOpen && (
              <div className="mt-2 rounded-xl border border-interaction-hover p-3">
                <DatePicker
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  disabled={{ before: now }}
                  className="w-full"
                />
              </div>
            )}
          </Sheet.Section>

          <Sheet.Section title="반복 설정">
            <Select
              value={frequencySelectValue}
              options={frequencyOptions}
              onChange={handleFrequencyChange}
              placeholder={FREQUENCY_LABEL.ONCE}
            />

            {form.frequencyType === "WEEKLY" && (
              <div className="mt-2">
                <WeeklyPicker
                  weekdays={form.weekDays ?? []}
                  onChange={(days) => handleInputChange("weekDays", days)}
                />
              </div>
            )}

            {form.frequencyType === "MONTHLY" && (
              <div className="mt-2">
                <TextField
                  type="number"
                  placeholder="1 ~ 31"
                  min={1}
                  max={31}
                  value={form.monthDay ?? ""}
                  onChange={(e) => handleMonthlyDayChange(e.target.value)}
                  onBlur={() => handleInputBlur("monthDay")}
                  errorMessage={
                    showError.monthDay ? errors.monthDay : undefined
                  }
                />
              </div>
            )}
          </Sheet.Section>

          <Sheet.Section title="할 일 메모">
            <InputBox
              placeholder="메모를 입력해주세요."
              minHeight={75}
              value={form.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
            />
          </Sheet.Section>
        </div>
      }
      action={
        <Button
          key="create-task"
          title="만들기"
          onClick={handleSubmit}
          disabled={isFormInvalid || postMutation.isPending}
        />
      }
    />
  );
}

interface OpenSheetProps {
  groupId: number;
  taskListId: number;
}
export function openTaskCreateSheet({ groupId, taskListId }: OpenSheetProps) {
  overlay.open(
    ({ isOpen, close, unmount }) => (
      <TaskCreateSheet
        isOpen={isOpen}
        close={close}
        unmount={unmount}
        groupId={groupId}
        taskListId={taskListId}
      />
    ),
    { overlayId: "add-task-sheet" }
  );
}
