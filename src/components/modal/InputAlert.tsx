import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { OverlayProps } from "@/components/overlay";
import { ChangeEvent, useState } from "react";
import Alert from "./Alert";

interface Props extends OverlayProps {
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
}: Props) {
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
        />,
      ]}
    />
  );
}
