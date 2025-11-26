import { Button } from "@/components/button";
import { OverlayProps } from "@/components/overlay";
import Alert from "./Alert";

interface Props extends OverlayProps {
  title: string;
  message: string;
  onDelete: () => void;
}

export default function DeleteAlert({
  isOpen,
  onClose,
  onExit,
  title,
  message,
  onDelete,
}: Props) {
  const handleDelete = () => {
    onDelete();
    onClose();
  };
  const actions = [
    <Button
      key="delete-alert-close-action"
      variant="outlinedSecondary"
      title="닫기"
      onClick={onClose}
    />,
    <Button
      key="delete-alert-delete-action"
      variant="danger"
      title="삭제하기"
      onClick={handleDelete}
    />,
  ];

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
      title={title}
      message={message}
      actions={actions}
      showsCloseButton={false}
    />
  );
}
