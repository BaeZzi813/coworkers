import clsx from "clsx";
import { useRef, useState } from "react";

type Size = "large" | "small";

interface Props {
  value?: string;
  placeholder?: string;
  size?: Size;
  height?: number;
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
}: Props) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [focused, setFocused] = useState(false);

  const handleOuterClick = () => {
    ref.current?.focus();
  };

  return (
    <div
      className={clsx(
        "h-20 cursor-text rounded-xl border border-border-primary px-4 py-3",
        focused && "border-brand-primary"
      )}
      style={{ height }}
      onClick={handleOuterClick}
    >
      <textarea
        className={clsx(
          "custom-scroll-bar h-full w-full resize-none outline-none",
          typography[size]
        )}
        value={value}
        placeholder={placeholder}
        rows={0}
        ref={ref}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </div>
  );
}
