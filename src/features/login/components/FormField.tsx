import { TextField } from "@/components/input";
import clsx from "clsx";
import type { ComponentPropsWithoutRef } from "react";

type TextFieldProps = ComponentPropsWithoutRef<typeof TextField>;

interface InputLabelProps extends TextFieldProps {
  label: string;
  labelClassName?: string;
  containerClassName?: string;
}

export default function InputLabel({
  label,
  labelClassName,
  containerClassName,
  id,
  ...textFieldProps
}: InputLabelProps) {
  return (
    <div className={clsx("flex flex-col gap-3", containerClassName)}>
      <label
        htmlFor={id}
        className={clsx("text-lg-m text-text-primary", labelClassName)}
      >
        {label}
      </label>
      <TextField id={id} {...textFieldProps} />
    </div>
  );
}
