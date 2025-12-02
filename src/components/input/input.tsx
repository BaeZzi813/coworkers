import clsx from "clsx";
import type { PropsWithChildren, ReactNode, Ref } from "react";
import { InputHTMLAttributes } from "react";

type Size = "large" | "small";
type InputType = "text" | "email" | "password" | "number" | "time";

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
  isError?: boolean; //텍스트필드 에러 프롭스
}

const baseClasses =
  "w-full rounded-xl border bg-background-primary text-text-primary placeholder:text-text-default focus:outline-none focus:ring-0 focus:ring-brand-primary transition disabled:border-state-200 disabled:bg-state-50 disabled:text-text-disabled";

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

function inputSize({
  size,
  contentPadding,
  hasTrailing,
  trailingPadding,
  className,
  isError,
}: {
  size: Size;
  contentPadding?: string;
  hasTrailing: boolean;
  trailingPadding?: string;
  className?: string;
  isError?: boolean;
}) {
  return clsx(
    baseClasses,
    heightClasses[size],
    textSizeClasses[size],
    contentPadding ?? contentPaddingClasses[size],
    hasTrailing ? (trailingPadding ?? "pr-12") : null,
    isError
      ? "border-[var(--color-status-danger)] focus:border-[var(--color-status-danger)]"
      : "border-state-300 focus:border-brand-primary",
    className
  );
}

type InputComponentProps = PropsWithChildrenAndRef<Props, HTMLInputElement>;

function Input({
  ref,
  size = "large",
  placeholder = "",
  type = "text",
  contentPadding,
  trailing,
  trailingClassName,
  trailingPadding,
  isError,
  className,
  ...rest
}: InputComponentProps) {
  const inputClassName = inputSize({
    size,
    contentPadding,
    hasTrailing: Boolean(trailing),
    trailingPadding,
    isError,
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
