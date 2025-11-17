import { TextField } from "@/components/input";
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
    <div className={`flex flex-col gap-3 ${containerClassName ?? ""}`}>
      <label
        htmlFor={id}
        className={`text-lg-m text-text-primary ${labelClassName ?? ""}`}
      >
        {label}
      </label>
      <TextField id={id} {...textFieldProps} />
    </div>
  );
}
