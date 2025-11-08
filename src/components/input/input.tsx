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
}

const baseClasses =
  "w-full rounded-xl border border-state-300 bg-background-primary text-text-primary placeholder:text-text-default focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary transition disabled:border-state-200 disabled:bg-state-50 disabled:text-text-disabled";

const wrapperClasses = "relative flex items-center";

const heightClasses: Record<Size, string> = {
  large: "h-12",
  small: "h-10",
};

const horizontalPadding: Record<Size, string> = {
  large: "px-4",
  small: "px-3",
};

function inputSize({
  size,
  contentPadding,
  Trailing,
  trailingPadding,
  className,
}: {
  size: Size;
  contentPadding?: string;
  Trailing: boolean;
  trailingPadding?: string;
  className?: string;
}) {
  return clsx(
    baseClasses,
    heightClasses[size],
    contentPadding ?? horizontalPadding[size],
    Trailing ? (trailingPadding ?? "pr-12") : null,
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
  className,
  ...rest
}: InputComponentProps) {
  const Trailing = Boolean(trailing);

  const inputClassName = inputSize({
    size: sizeProp,
    contentPadding,
    Trailing,
    trailingPadding,
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
      {Trailing ? (
        <div
          className={clsx(
            "absolute right-3 flex items-center",
            trailingClassName
          )}
        >
          {trailing}
        </div>
      ) : null}
    </div>
  );
}

export default Input;
