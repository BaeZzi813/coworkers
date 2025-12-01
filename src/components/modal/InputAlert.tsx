import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { OverlayProps } from "@/components/overlay";
import { overlay } from "overlay-kit";
import { ChangeEvent, useState } from "react";
import Alert from "./Alert";

interface Props {
  title: string;
  value?: string;
  placeholder: string;
  submitTitle: string;
  onSubmit: (inputValue: string) => void;
}

export default function InputAlert({
  title,
  value,
  placeholder,
  submitTitle,
  onSubmit,
  ...overlayProps
}: Props & OverlayProps) {
  const [inputValue, setInputValue] = useState(value ?? "");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleClick = () => {
    onSubmit(inputValue);
    overlayProps.onClose();
  };

  return (
    <Alert
      {...overlayProps}
      title={title}
      content={
        <Input
          value={inputValue}
          placeholder={placeholder}
          onChange={handleInputChange}
        />
      }
      actions={[
        <Button
          key="input-alert-submit-action"
          title={submitTitle}
          onClick={handleClick}
          disabled={inputValue.trim() === ""}
        />,
      ]}
    />
  );
}

export function openInputAlert({
  title,
  value,
  placeholder,
  submitTitle,
  onSubmit,
}: Props) {
  overlay.open(
    ({ isOpen, close, unmount }) => (
      <InputAlert
        isOpen={isOpen}
        onClose={close}
        onExit={unmount}
        title={title}
        value={value}
        placeholder={placeholder}
        submitTitle={submitTitle}
        onSubmit={onSubmit}
      />
    ),
    { overlayId: "input-alert" }
  );
}
