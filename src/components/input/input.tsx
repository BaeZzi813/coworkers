<<<<<<< HEAD
import clsx from "clsx";
import type { PropsWithChildren, ReactNode, Ref } from "react";
import { InputHTMLAttributes } from "react";

type Size = "large" | "small";
<<<<<<< HEAD
type InputType = "text" | "email" | "password";
=======
=======
import InvisibleIcon from "@/assets/icons/ic-invisible.svg";
import VisibleIcon from "@/assets/icons/ic-visible.svg";
import { Button } from "@/components/button";
import clsx from "clsx";
import { forwardRef, InputHTMLAttributes, useMemo, useState } from "react";

type Size = "pc" | "mobile" | "modal";
type Variant = "default" | "password" | "passwordChange";
>>>>>>> 3e599f0 (feat [codeif-fe18-4-3 #12] 인풋 옵션(텍스트, 패스워드, 버튼) 제작)
type InputType = "text" | "password";
>>>>>>> 3e705de882c5385d87adc75bc127bd73d48a371e

<<<<<<< HEAD
type PropsWithChildrenAndRef<
  P = unknown,
  R = unknown,
> = PropsWithChildren<P> & { ref?: Ref<R> };

=======
>>>>>>> 3e599f0 (feat [codeif-fe18-4-3 #12] 인풋 옵션(텍스트, 패스워드, 버튼) 제작)
interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "placeholder"
  > {
  size?: Size;
  placeholder?: string;
  type?: InputType;
<<<<<<< HEAD
  contentPadding?: string;
  trailing?: ReactNode; //프롭스로 아이콘이나 버튼 등을 받고 사이즈도 프롭스로 커스텀
  trailingClassName?: string;
  trailingPadding?: string;
<<<<<<< HEAD
  isError?: boolean; //텍스트필드 에러 프롭스
}

const baseClasses =
  "w-full rounded-xl border border-state-300 bg-background-primary text-text-primary placeholder:text-text-default focus:border-brand-primary focus:outline-none focus:ring-0 focus:ring-brand-primary transition disabled:border-state-200 disabled:bg-state-50 disabled:text-text-disabled";

const wrapperClasses = "relative flex items-center w-full";

const heightClasses: Record<Size, string> = {
  large: "h-12",
  small: "h-11",
};

const contentPaddingClasses: Record<Size, string> = {
  large: "pl-4 pr-2 py-[3.5px]",
  small: "pl-4 pr-[6px] py-[5.5px]",
};

const textSizeClasses: Record<Size, string> = {
  large: "text-lg-r",
  small: "text-md-r",
};
=======
  hasError?: boolean; //텍스트필드 에러 프롭스
}

const baseClasses =
  "w-full rounded-xl border bg-background-primary text-text-primary placeholder:text-text-default focus:outline-none focus:ring-2 transition disabled:border-state-200 disabled:bg-state-50 disabled:text-text-disabled";

const wrapperClasses = "relative flex items-center";

const heightClasses: Record<Size, string> = {
  large: "h-12",
  small: "h-10",
};

const horizontalPadding: Record<Size, string> = {
  large: "px-4",
  small: "px-3",
};

function colorClass(hasError: boolean | undefined) {
  return hasError
    ? "border-status-danger focus:border-status-danger focus:ring-status-danger"
    : "border-state-300 focus:border-brand-primary focus:ring-brand-primary";
}
>>>>>>> 3e705de882c5385d87adc75bc127bd73d48a371e

function inputSize({
  size,
  contentPadding,
  hasTrailing,
  trailingPadding,
  className,
<<<<<<< HEAD
  isError,
=======
  hasError,
>>>>>>> 3e705de882c5385d87adc75bc127bd73d48a371e
}: {
  size: Size;
  contentPadding?: string;
  hasTrailing: boolean;
  trailingPadding?: string;
  className?: string;
<<<<<<< HEAD
  isError?: boolean;
=======
  hasError?: boolean;
>>>>>>> 3e705de882c5385d87adc75bc127bd73d48a371e
}) {
  return clsx(
    baseClasses,
    heightClasses[size],
<<<<<<< HEAD
    textSizeClasses[size],
    contentPadding ?? contentPaddingClasses[size],
=======
    colorClass(hasError),
    contentPadding ?? horizontalPadding[size],
>>>>>>> 3e705de882c5385d87adc75bc127bd73d48a371e
    hasTrailing ? (trailingPadding ?? "pr-12") : null,
=======
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
>>>>>>> 3e599f0 (feat [codeif-fe18-4-3 #12] 인풋 옵션(텍스트, 패스워드, 버튼) 제작)
    className
  );
}

<<<<<<< HEAD
type InputComponentProps = PropsWithChildrenAndRef<Props, HTMLInputElement>;

function Input({
  ref,
<<<<<<< HEAD
  size = "large",
=======
  size: sizeProp = "large",
>>>>>>> 3e705de882c5385d87adc75bc127bd73d48a371e
  placeholder = "",
  type = "text",
  contentPadding,
  trailing,
  trailingClassName,
  trailingPadding,
<<<<<<< HEAD
  isError,
=======
  hasError,
>>>>>>> 3e705de882c5385d87adc75bc127bd73d48a371e
  className,
  ...rest
}: InputComponentProps) {
  const inputClassName = inputSize({
<<<<<<< HEAD
    size,
    contentPadding,
    hasTrailing: Boolean(trailing),
    trailingPadding,
    isError,
=======
    size: sizeProp,
    contentPadding,
    hasTrailing: Boolean(trailing),
    trailingPadding,
    hasError,
>>>>>>> 3e705de882c5385d87adc75bc127bd73d48a371e
    className,
  });
=======
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
>>>>>>> 3e599f0 (feat [codeif-fe18-4-3 #12] 인풋 옵션(텍스트, 패스워드, 버튼) 제작)

  return (
    <div className={wrapperClasses}>
      <input
        ref={ref}
<<<<<<< HEAD
        type={type}
=======
        type={resolvedType}
>>>>>>> 3e599f0 (feat [codeif-fe18-4-3 #12] 인풋 옵션(텍스트, 패스워드, 버튼) 제작)
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
<<<<<<< HEAD
      {trailing && (
        <div
          className={clsx(
            "absolute right-3 flex items-center",
            trailingClassName
          )}
        >
          {trailing}
        </div>
      )}
=======
      {trailingContent}
>>>>>>> 3e599f0 (feat [codeif-fe18-4-3 #12] 인풋 옵션(텍스트, 패스워드, 버튼) 제작)
    </div>
  );
}

export default Input;
