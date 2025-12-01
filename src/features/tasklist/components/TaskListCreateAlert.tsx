import { InputAlert } from "@/components/modal";
import { OverlayProps } from "@/components/overlay";
import { groupsQueryKey } from "@/features/group/query/query-key";
import { overlay } from "overlay-kit";
import { useTaskListMutation } from "../query";

interface Props {
  groupId: number;
}

export default function TaskListCreateAlert({
  isOpen,
  onClose,
  onExit,
  groupId,
}: Props & OverlayProps) {
  const { postMutation } = useTaskListMutation();

  const handleSubmit = (inputValue: string) => {
    postMutation.mutate(
      { groupId, name: inputValue },
      {
        onSuccess: (data, variables, onMutationResult, context) => {
          context.client.invalidateQueries({
            queryKey: groupsQueryKey({ groupId }),
          });
        },
      }
    );
  };

  return (
    <InputAlert
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
      title="할 일 목록"
      placeholder="목록 명을 입력해주세요."
      submitTitle="만들기"
      onSubmit={handleSubmit}
    />
  );
}

export function openTaskListCreateAlert({ groupId }: Props) {
  overlay.open(
    ({ isOpen, close, unmount }) => (
      <TaskListCreateAlert
        isOpen={isOpen}
        onClose={close}
        onExit={unmount}
        groupId={groupId}
      />
    ),
    { overlayId: "add-tasklist-alert" }
  );
}
