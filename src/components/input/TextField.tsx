import { Input } from "@/components/input";
import clsx from "clsx";
import { useId, type ComponentPropsWithRef } from "react";

interface TextFieldProps extends ComponentPropsWithRef<typeof Input> {
  errorMessage?: string;
  showError?: boolean;
  containerClassName?: string;
  messageClassName?: string;
}

function TextField({
  errorMessage,
  showError,
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

  const shouldShowError = showError ?? Boolean(errorMessage);
  const { ["aria-describedby"]: ariaDescribedBy, ...restInputProps } =
    inputProps;
  const describedByValue = shouldShowError
    ? [ariaDescribedBy, messageId].filter(Boolean).join(" ").trim() || undefined
    : ariaDescribedBy;

  const spacingClassName = size === "small" ? "gap-3" : "gap-2";

  return (
    <div
      className={clsx("flex flex-col", spacingClassName, containerClassName)}
    >
      <Input
        {...restInputProps}
        id={inputId}
        size={size}
        ref={inputRef}
        isError={shouldShowError}
        aria-describedby={describedByValue}
      />
      {shouldShowError && errorMessage ? (
        <p
          id={messageId}
          className={clsx("text-sm-m text-status-danger", messageClassName)}
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}

export default TextField;
