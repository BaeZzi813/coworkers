import Icon from "@/components/icon";
import { type IconName } from "@/components/icon/icons";
import clsx from "clsx";

type Variant = "primary" | "outlined" | "danger";

type ButtonSize = "large" | "medium" | "small";

interface Props {
  title: string;
  iconName?: IconName;
  variant?: Variant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  rounded?: boolean;
  disabled?: boolean;
}

const backgrounds: Record<Variant, string> = {
  primary:
    "bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed disabled:bg-interaction-inactive",
  outlined: "bg-transparent",
  danger:
    "bg-status-danger hover:bg-status-danger-hover active:bg-status-danger-pressed disabled:bg-interaction-inactive",
};

function borders(variant: Variant, size: ButtonSize, rounded: boolean) {
  const borderRadius: Record<ButtonSize, string> = {
    large: "rounded-xl",
    medium: "rounded-xl",
    small: "rounded-lg",
  };

  const round = rounded ? "rounded-full" : borderRadius[size];
  if (variant !== "outlined") {
    return round;
  }

  return `${round} border-1 border-brand-primary hover:border-brand-primary-hover active:border-brand-primary-pressed disabled:border-interaction-inactive`;
}

function fonts(variant: Variant, size: ButtonSize) {
  const textColor: Record<Variant, string> = {
    primary: "text-white",
    outlined:
      "text-brand-primary hover:text-brand-primary-hover active:text-brand-primary-pressed disabled:text-interaction-inactive",
    danger: "text-white",
  };

  const fontSize: Record<ButtonSize, string> = {
    large: `text-lg-s ${textColor[variant]}`,
    medium: `text-md-s ${textColor[variant]}`,
    small: `text-md-s ${textColor[variant]}`,
  };

  return fontSize[size];
}

function sizes({
  size,
  isFullWidth,
}: {
  size: ButtonSize;
  isFullWidth: boolean;
}) {
  const height: Record<ButtonSize, string> = {
    large: "h-12",
    medium: "h-10",
    small: "h-8",
  };

  const padding: Record<ButtonSize, string> = {
    large: "px-6",
    medium: "px-5",
    small: "px-3",
  };

  if (isFullWidth) {
    return `${height[size]} w-full`;
  } else {
    return `${height[size]} w-auto ${padding[size]}`;
  }
}

export default function Button({
  title,
  iconName,
  variant = "primary",
  size = "large",
  isFullWidth = true,
  rounded = false,
  disabled,
}: Props) {
  return (
    <button
      className={clsx(
        "cursor-pointer disabled:cursor-default",
        "flex justify-center",
        backgrounds[variant],
        borders(variant, size, rounded),
        sizes({ size, isFullWidth }),
        fonts(variant, size)
      )}
      disabled={disabled}
    >
      <div className="flex items-center gap-2">
        {iconName && (
          <div className="size-4">
            <Icon name={iconName} />
          </div>
        )}
        <div className="flex items-center justify-center gap-1">{title}</div>
      </div>
    </button>
  );
}
