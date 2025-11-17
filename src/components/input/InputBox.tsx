import clsx from "clsx";
import { ChangeEventHandler, useRef, useState } from "react";

type Size = "large" | "small";

interface Props {
  value?: string;
  placeholder?: string;
  size?: Size;
  height?: number;
  minHeight?: number;
  onChange?: ChangeEventHandler<HTMLTextAreaElement>;
}

const typography: Record<Size, string> = {
  large: "text-lg-r",
  small: "text-md-r",
};

export default function InputBox({
  value,
  placeholder,
  size = "large",
  height,
  minHeight,
  onChange,
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  const handleOuterClick = () => {
    ref.current?.focus();
  };

  return (
    <div
      className={clsx(
        "cursor-text rounded-xl border px-4 py-3",
        focused ? "border-brand-primary" : "border-border-primary"
      )}
      style={{ height, minHeight }}
      onClick={handleOuterClick}
    >
      <textarea
        className={clsx(
          "field-sizing-content custom-scroll-bar h-full w-full resize-none outline-none",
          typography[size],
          height || "resize"
        )}
        value={value}
        placeholder={placeholder}
        rows={0}
        ref={ref}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
      />
    </div>
  );
}
