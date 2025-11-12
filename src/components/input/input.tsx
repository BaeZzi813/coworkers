import clsx from "clsx";
import type { PropsWithChildren, ReactNode, Ref } from "react";
import { InputHTMLAttributes } from "react";

type Size = "large" | "small";
type InputType = "text" | "password";

type PropsWithChildrenAndRef<
  P = unknown,
  R = unknown,
> = PropsWithChildren<P> & { ref?: Ref<R> };

interface Props
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "size" | "type" | "placeholder"
  > {
  size?: Size;
  placeholder?: string;
  type?: InputType;
  contentPadding?: string;
  trailing?: ReactNode; //프롭스로 아이콘이나 버튼 등을 받고 사이즈도 프롭스로 커스텀
  trailingClassName?: string;
  trailingPadding?: string;
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

function inputSize({
  size,
  contentPadding,
  hasTrailing,
  trailingPadding,
  className,
  hasError,
}: {
  size: Size;
  contentPadding?: string;
  hasTrailing: boolean;
  trailingPadding?: string;
  className?: string;
  hasError?: boolean;
}) {
  return clsx(
    baseClasses,
    heightClasses[size],
    colorClass(hasError),
    contentPadding ?? horizontalPadding[size],
    hasTrailing ? (trailingPadding ?? "pr-12") : null,
    className
  );
}

type InputComponentProps = PropsWithChildrenAndRef<Props, HTMLInputElement>;

function Input({
  ref,
  size: sizeProp = "large",
  placeholder = "",
  type = "text",
  contentPadding,
  trailing,
  trailingClassName,
  trailingPadding,
  hasError,
  className,
  ...rest
}: InputComponentProps) {
  const inputClassName = inputSize({
    size: sizeProp,
    contentPadding,
    hasTrailing: Boolean(trailing),
    trailingPadding,
    hasError,
    className,
  });

  return (
    <div className={wrapperClasses}>
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
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
    </div>
  );
}

export default Input;
