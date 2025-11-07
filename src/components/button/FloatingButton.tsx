import { IconName } from "@/components/icon/icons";
import clsx from "clsx";
import Icon from "../icon";

type Variant = "primary" | "inverse";

interface Props {
  variant?: Variant;
  iconName: IconName;
}

const backgroundColor: Record<Variant, string> = {
  primary:
    "bg-brand-primary hover:bg-brand-primary-hover active:bg-brand-primary-pressed",
  inverse: "bg-background-primary",
};

const border: Record<Variant, string> = {
  primary: "rounded-full",
  inverse: "border-1 border-border-primary rounded-full",
};

export default function FloatingButton({
  variant = "primary",
  iconName,
}: Props) {
  return (
    <button
      className={clsx(
        backgroundColor[variant],
        border[variant],
        "flex size-14 cursor-pointer items-center justify-center"
      )}
    >
      <div className="size-6 -translate-x-[0.5px]">
        <Icon name={iconName} />
      </div>
    </button>
  );
}
