import EditDropdown from "@/components/dropdown/EditDropdown";
import { DeleteAlert, ErrorAlert, InputAlert } from "@/components/modal";
import { groupsQueryKey } from "@/features/group/query/query-key";
import { useResponsive } from "@/hooks/use-responsive";
import { TaskList } from "@/types/task";
import { useQueryClient } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import { ReactNode } from "react";
import { useTaskListMutation } from "../query";

interface Props {
  taskList: TaskList;
  anchor: ReactNode;
}

export default function TaskListEditDropdown({ taskList, anchor }: Props) {
  const { isDesktop } = useResponsive();
  const { deleteMutation, patchMutation } = useTaskListMutation();
  const queryClient = useQueryClient();

  const handleSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: groupsQueryKey({ groupId: taskList.groupId }),
    });
  };

  const handleError = (error: Error) => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <ErrorAlert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="삭제 실패"
          error={error}
        />
      ),
      { overlayId: "delete-error-alert" }
    );
  };

  const handleEdit = () => {
    const handleSubmit = (newName: string) => {
      patchMutation.mutate(
        {
          groupId: taskList.groupId,
          taskListId: taskList.id,
          name: newName,
        },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        }
      );
    };

    overlay.open(
      ({ isOpen, close, unmount }) => (
        <InputAlert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="할 일 목록 수정"
          value={taskList.name}
          placeholder="목록 명을 입력해주세요."
          submitTitle="수정하기"
          onSubmit={handleSubmit}
        />
      ),
      { overlayId: "edit-tasklist-alert" }
    );
  };

  const handleDelete = () => {
    const handleDelete = () => {
      deleteMutation.mutate(
        { groupId: taskList.groupId, taskListId: taskList.id },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        }
      );
    };

    overlay.open(
      ({ isOpen, close, unmount }) => (
        <DeleteAlert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title={`'${taskList.name}'\n할 일을 정말 삭제하시겠어요?`}
          onDelete={handleDelete}
        />
      ),
      { overlayId: "delete-tasklist-alert" }
    );
  };

  return (
    <EditDropdown
      anchor={anchor}
      gap={10}
      direction={isDesktop ? undefined : "left"}
      alignment={isDesktop ? "left" : "bottom"}
      alignmentOffset={-6}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}
