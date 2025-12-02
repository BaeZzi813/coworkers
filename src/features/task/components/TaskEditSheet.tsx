import { Button } from "@/components/button";
import { Input, InputBox } from "@/components/input";
import { Sheet } from "@/components/modal";
import { overlay } from "overlay-kit";
import { useState } from "react";
import { useTaskMutation } from "../query";

interface Props {
  isOpen: boolean;
  close: () => void;
  unmount: () => void;

  groupId: number;
  taskListId: number;
  taskId: number;
  initialData: {
    name: string;
    description: string;
    done: boolean;
  };
}

export default function TaskEditSheet({
  isOpen,
  close,
  unmount,
  groupId,
  taskListId,
  taskId,
  initialData,
}: Props) {
  const [EditData, setEditData] = useState(initialData);
  const [showError, setShowError] = useState(false);

  const { patchMutation } = useTaskMutation({ groupId, taskListId });

  const isInvalid = EditData.name.trim() === "";

  const handleInputChange = <K extends keyof typeof EditData>(
    key: K,
    value: (typeof EditData)[K]
  ) => {
    setEditData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (isInvalid || patchMutation.isPending) return;

    patchMutation.mutate(
      { taskId, ...EditData },
      {
        onSuccess: () => {
          close();
        },
      }
    );
  };

  return (
    <Sheet
      isOpen={isOpen}
      onClose={close}
      onExit={unmount}
      title="할 일 수정"
      message="할 일은 실제로 행동 가능한 작업 중심으로 작성해주시면 좋습니다."
      content={
        <div className="flex flex-col gap-6">
          <Sheet.Section title="할 일 제목">
            <Input
              value={EditData.name}
              placeholder="할 일 제목을 입력해주세요."
              onChange={(event) =>
                handleInputChange("name", event.target.value)
              }
              onBlur={() => setShowError(true)}
            />
            {showError && isInvalid && (
              <p className="text-danger mt-1 text-xs-r">제목을 입력해주세요.</p>
            )}
          </Sheet.Section>

          <Sheet.Section title="할 일 메모">
            <InputBox
              value={EditData.description}
              placeholder="메모를 입력해주세요."
              minHeight={75}
              onChange={(event) =>
                handleInputChange("description", event.target.value)
              }
            />
          </Sheet.Section>
        </div>
      }
      action={
        <Button
          key="edit-task"
          title="수정하기"
          onClick={handleSubmit}
          disabled={isInvalid}
        />
      }
    />
  );
}

interface OpenSheetProps {
  groupId: number;
  taskListId: number;
  taskId: number;
  initialData: {
    name: string;
    description: string;
    done: boolean;
  };
}
export function openTaskEditSheet(props: OpenSheetProps) {
  overlay.open(
    ({ isOpen, close, unmount }) => (
      <TaskEditSheet
        isOpen={isOpen}
        close={close}
        unmount={unmount}
        {...props}
      />
    ),
    { overlayId: "edit-task-sheet" }
  );
}
