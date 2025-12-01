import { Button } from "@/components/button";
import { overlay } from "overlay-kit";
import { OverlayProps } from "../overlay";
import Alert from "./Alert";

interface Props {
  title: string;
  error: Error;
}

export default function ErrorAlert({
  title,
  error,
  ...overlayProps
}: Props & OverlayProps) {
  return (
    <Alert
      {...overlayProps}
      title={title}
      message={error.message}
      actions={[
        <Button
          key="error-alert"
          title="확인"
          onClick={overlayProps.onClose}
        />,
      ]}
      showsCloseButton={false}
    />
  );
}

export function openErrorAlert({ title, error }: Props) {
  overlay.open(
    ({ isOpen, close, unmount }) => (
      <ErrorAlert
        isOpen={isOpen}
        onClose={close}
        onExit={unmount}
        title={title}
        error={error}
      />
    ),
    { overlayId: "error-alert" }
  );
}
