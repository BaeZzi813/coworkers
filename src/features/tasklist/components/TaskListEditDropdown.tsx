import EditDropdown from "@/components/dropdown/EditDropdown";
import { openDeleteAlert } from "@/components/modal/DeleteAlert";
import { openErrorAlert } from "@/components/modal/ErrorAlert";
import { openInputAlert } from "@/components/modal/InputAlert";
import { groupsQueryKey } from "@/features/group/query/query-key";
import { useResponsive } from "@/hooks/use-responsive";
import { TaskList } from "@/types/task";
import { useQueryClient } from "@tanstack/react-query";
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
    openErrorAlert({ title: "할 일 목록 삭제 실패", error });
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

    openInputAlert({
      title: "할 일 목록 수정",
      value: taskList.name,
      placeholder: "목록 명을 입력해주세요.",
      submitTitle: "수정하기",
      onSubmit: handleSubmit,
    });
  };

  const handleTaskListDelete = () => {
    const handleDelete = () => {
      deleteMutation.mutate(
        { groupId: taskList.groupId, taskListId: taskList.id },
        {
          onSuccess: handleSuccess,
          onError: handleError,
        }
      );
    };

    openDeleteAlert({
      title: `'${taskList.name}'\n할 일을 정말 삭제하시겠어요?`,
      onDelete: handleDelete,
    });
  };

  return (
    <EditDropdown
      anchor={anchor}
      gap={10}
      direction={isDesktop ? undefined : "left"}
      alignment={isDesktop ? "left" : "bottom"}
      alignmentOffset={-6}
      onEdit={handleEdit}
      onDelete={handleTaskListDelete}
    />
  );
}
