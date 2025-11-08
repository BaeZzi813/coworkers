import InvisibleIcon from "@/assets/icons/ic-invisible.svg";
import VisibleIcon from "@/assets/icons/ic-visible.svg";
import { Button } from "@/components/button";
import clsx from "clsx";
import { forwardRef, InputHTMLAttributes, useMemo, useState } from "react";

type Size = "pc" | "mobile" | "modal";
type Variant = "default" | "password" | "passwordChange";
type InputType = "text" | "password";

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "placeholder"
  > {
  size?: Size;
  placeholder?: string;
  type?: InputType;
  variant?: Variant;
}

const baseClasses =
  "rounded-xl border border-state-300 bg-background-primary text-text-primary placeholder:text-text-default focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary transition disabled:border-state-200 disabled:bg-state-50 disabled:text-text-disabled";

const wrapperClasses = "relative flex items-center";

const sizeClasses: Record<Size, string> = {
  pc: "w-[460px] h-12 px-4",
  mobile: "w-[300px] h-11 px-4",
  modal: "w-[280px] h-11 px-4",
};

const trailingPadding: Partial<Record<Variant, string>> = {
  password: "pr-12",
  passwordChange: "pr-28",
};

function size({
  size,
  variant,
  className,
}: {
  size: Size;
  variant: Variant;
  className?: string;
}) {
  return clsx(
    baseClasses,
    sizeClasses[size],
    trailingPadding[variant],
    className
  );
}

function trailing({
  variant,
  isPasswordVisible,
  onTogglePassword,
}: {
  variant: Variant;
  isPasswordVisible: boolean;
  onTogglePassword: () => void;
}) {
  if (variant === "password") {
    const Icon = isPasswordVisible ? VisibleIcon : InvisibleIcon;

    return (
      <button
        type="button"
        className="absolute right-3 flex h-6 w-6 cursor-pointer items-center justify-center"
        onClick={onTogglePassword}
        aria-label={isPasswordVisible ? "비밀번호 숨기기" : "비밀번호 표시"}
      >
        <Icon width={24} height={24} aria-hidden />
      </button>
    );
  }

  if (variant === "passwordChange") {
    return (
      <div className="absolute right-3">
        <Button title="변경하기" size="small" isFullWidth={false} />
      </div>
    );
  }
  return null;
}

const Input = forwardRef<HTMLInputElement, Props>(function Input(
  {
    size: sizeProp = "pc",
    placeholder = "",
    type = "text",
    variant = "default",
    className,
    ...rest
  },
  ref
) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const inputClassName = size({ size: sizeProp, variant, className });

  const trailingContent = useMemo(
    () =>
      trailing({
        variant,
        isPasswordVisible,
        onTogglePassword: () => setPasswordVisible((prev) => !prev),
      }),
    [isPasswordVisible, variant]
  );

  const baseType: InputType = variant === "password" ? "password" : type;
  const resolvedType =
    variant === "password" && isPasswordVisible ? "text" : baseType;

  return (
    <div className={wrapperClasses}>
      <input
        ref={ref}
        type={resolvedType}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
      {trailingContent}
    </div>
  );
});

export default Input;
