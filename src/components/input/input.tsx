import { forwardRef, InputHTMLAttributes } from "react";
import type { InputSize } from "./types";

type InputType = "text" | "password";

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "placeholder"
  > {
  size?: InputSize;
  placeholder?: string;
  type?: InputType;
}

const sizeStyles: Record<InputSize, string> = {
  pc: "w-[460px] h-12 px-4",
  mobile: "w-[300px] h-11 px-4",
};

const baseStyle =
  "rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary transition disabled:border-gray-200 disabled:bg-gray-100 disabled:text-gray-400";

const Input = forwardRef<HTMLInputElement, InputProps>(function renderInput(
  { size = "pc", placeholder = "", type = "text", className, ...rest },
  ref
) {
  const sizeClassName = sizeStyles[size];
  const combinedClassName = [baseStyle, sizeClassName, className]
    .filter(Boolean)
    .join(" ");

  return (
    <input
      ref={ref}
      type={type}
      placeholder={placeholder}
      className={combinedClassName}
      {...rest}
    />
  );
});

export default Input;
