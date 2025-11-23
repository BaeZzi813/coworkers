import { Button } from "@/components/button";
import Icon from "@/components/icon";
import { Alert } from "@/components/modal";

type DeleteTargetType = "task" | "taskList";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  type: DeleteTargetType;
  targetName: string;
  onDelete: () => Promise<void>;
}

export default function DeleteModal({
  isOpen,
  onClose,
  onExit,
  type,
  targetName,
  onDelete,
}: DeleteModalProps) {
  const targetLabel = type === "task" ? "할 일" : "할 일 목록";
  const title = `‘${targetName}’\n${targetLabel}을 정말 삭제하시겠어요?`;

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
      header={<Icon name="alert" size="small" color="transparent" />}
      title={title}
      message="삭제 후에는 되돌릴 수 없습니다."
      actions={[
        <Button
          key="cancle"
          title="닫기"
          variant="outlinedSecondary"
          onClick={onClose}
        />,
        <Button
          key="submit"
          title="삭제하기"
          variant="danger"
          onClick={async () => {
            await onDelete();
            onClose();
          }}
        />,
      ]}
    />
  );
}
