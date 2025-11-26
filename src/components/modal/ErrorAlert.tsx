import { Button } from "@/components/button";
import { OverlayProps } from "../overlay";
import Alert from "./Alert";

interface Props extends OverlayProps {
  title: string;
  error: Error;
}

export default function ErrorAlert({
  isOpen,
  onClose,
  onExit,
  title,
  error,
}: Props) {
  return (
    <Alert
      title={title}
      message={error.message}
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
      actions={[<Button key="error-alert" title="확인" onClick={onClose} />]}
      showsCloseButton={false}
    />
  );
}
