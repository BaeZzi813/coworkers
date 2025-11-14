import { Input } from "@/components/input";
import clsx from "clsx";
import { useId, type ComponentPropsWithRef } from "react";

interface TextFieldProps extends ComponentPropsWithRef<typeof Input> {
  errorMessage?: string;
  containerClassName?: string;
  messageClassName?: string;
}

function TextField({
  errorMessage,
  containerClassName,
  messageClassName,
  id,
  size = "large",
  ref: inputRef,
  ...inputProps
}: TextFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const messageId = `${inputId}-message`;

  const isError = errorMessage != null && errorMessage.trim() !== "";
  const { ["aria-describedby"]: ariaDescribedBy, ...restInputProps } =
    inputProps;
  const describedByValue = isError
    ? [ariaDescribedBy, messageId].filter(Boolean).join(" ").trim() || undefined
    : ariaDescribedBy;

  const spacingClassName = size === "small" ? "gap-3" : "gap-2";
  const messagePaddingClassName = size === "small" ? "pr-[6px]" : "pr-2";

  return (
    <div
      className={clsx(
        "flex w-full flex-col",
        spacingClassName,
        containerClassName
      )}
    >
      <Input
        {...restInputProps}
        id={inputId}
        size={size}
        ref={inputRef}
        isError={isError}
        aria-describedby={describedByValue}
      />
      {isError && (
        <p
          id={messageId}
          className={clsx(
            "w-full text-sm-m text-status-danger",
            messagePaddingClassName,
            messageClassName
          )}
          role="alert"
        >
          {errorMessage}
        </p>
      )}
    </div>
  );
}

export default TextField;
