import Icon from "@/components/icon";
import { type IconName } from "@/components/icon/icons";
import clsx from "clsx";
import { MouseEventHandler } from "react";

type Variant = "primary" | "outlinedPrimary" | "outlinedSecondary" | "danger";

type ButtonSize = "large" | "medium" | "small";

interface Props {
  className?: string;
  title: string;
  iconName?: IconName;
  variant?: Variant;
  size?: ButtonSize;
  isFullWidth?: boolean;
  rounded?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const backgrounds: Record<Variant, string> = {
  primary:
    "bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed disabled:bg-interaction-inactive",
  outlinedPrimary: "bg-transparent",
  outlinedSecondary: "bg-transparent",
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

  switch (variant) {
    case "primary":
    case "danger":
      return round;
    case "outlinedPrimary":
      return `${round} border-1 border-brand-primary hover:border-brand-primary-hover active:border-brand-primary-pressed disabled:border-interaction-inactive`;
    case "outlinedSecondary":
      return `${round} border-1 border-border-secondary`;
  }
}

function fonts(variant: Variant, size: ButtonSize) {
  const textColor: Record<Variant, string> = {
    primary: "text-white",
    outlinedPrimary:
      "text-brand-primary hover:text-brand-primary-hover active:text-brand-primary-pressed disabled:text-interaction-inactive",
    outlinedSecondary: "text-text-default",
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

const iconColor: Record<Variant, string> = {
  primary: clsx("stroke-icon-inverse", "fill-icon-inverse"),
  outlinedPrimary: clsx(
    "stroke-icon-brand hover:stroke-brand-primary-hover active:stroke-brand-primary-pressed disabled:stroke-interaction-inactive",
    "fill-icon-brand hover:fill-brand-primary-hover active:fill-brand-primary-pressed disabled:fill-interaction-inactive"
  ),
  outlinedSecondary: clsx("stroke-icon-primary", "fill-icon-primary"),
  danger: clsx("stroke-icon-inverse", "fill-icon-inverse"),
};

export default function Button({
  className,
  title,
  iconName,
  variant = "primary",
  size = "large",
  isFullWidth = true,
  rounded = false,
  disabled,
  onClick,
}: Props) {
  return (
    <button
      className={clsx(
        "cursor-pointer disabled:cursor-default",
        "flex justify-center",
        backgrounds[variant],
        borders(variant, size, rounded),
        sizes({ size, isFullWidth }),
        fonts(variant, size),
        iconColor[variant],
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      <div className="flex items-center gap-2">
        {iconName && (
          <div className="size-4">
            <Icon name={iconName} size="small" />
          </div>
        )}
        <span className="whitespace-nowrap">{title}</span>
      </div>
    </button>
  );
}
