import { Button } from "@/components/button";
import { OverlayProps } from "@/components/overlay";
import { overlay } from "overlay-kit";
import Alert from "./Alert";

interface Props {
  title: string;
  message?: string;
  onDelete: () => void;
}

export default function DeleteAlert({
  title,
  message = "삭제 후에는 되돌릴 수 없습니다.",
  onDelete,
  ...overlayProps
}: Props & OverlayProps) {
  const handleDelete = () => {
    onDelete();
    overlayProps.onClose();
  };
  const actions = [
    <Button
      key="delete-alert-close-action"
      variant="outlinedSecondary"
      title="닫기"
      onClick={overlayProps.onClose}
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
      {...overlayProps}
      title={title}
      message={message}
      actions={actions}
      showsCloseButton={false}
    />
  );
}

export function openDeleteAlert({ title, message, onDelete }: Props) {
  overlay.open(
    ({ isOpen, close, unmount }) => (
      <DeleteAlert
        isOpen={isOpen}
        onClose={close}
        onExit={unmount}
        title={title}
        message={message}
        onDelete={onDelete}
      />
    ),
    { overlayId: "delete-alert" }
  );
}
