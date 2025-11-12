import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";
import Input from "../input";

interface TextFieldProps extends ComponentPropsWithoutRef<typeof Input> {
  errorMessage?: string;
  showError?: boolean;
  containerClassName?: string;
  messageClassName?: string;
}

export default function TextField({
  errorMessage,
  showError,
  containerClassName,
  messageClassName,
  ...inputProps
}: TextFieldProps) {
  const shouldShowError = showError ?? Boolean(errorMessage);

  return (
    <div className={clsx("flex flex-col gap-1", containerClassName)}>
      <Input {...inputProps} hasError={shouldShowError} />
      {shouldShowError && errorMessage ? (
        <p
          className={clsx("text-sm text-status-danger", messageClassName)}
          role="alert"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
