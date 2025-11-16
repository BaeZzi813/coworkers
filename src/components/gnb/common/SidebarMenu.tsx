import Icon from "@/components/icon";
import { IconName } from "@/components/icon/icons";
import { clsx } from "clsx";

interface Props {
  iconName: IconName;
  title: string;
  compact?: boolean;
  active?: boolean;
}

export default function SidebarMenu({
  iconName,
  title,
  compact = false,
  active = false,
}: Props) {
  return (
    <div
      className={clsx(
        "flex items-center gap-3 rounded-xl hover:bg-state-50",
        compact ? "justify-center p-3.5" : "px-2 py-3 tablet:p-4",
        active && "bg-blue-50"
      )}
    >
      <Icon
        name={iconName}
        size={compact ? "large" : "small"}
        color={active ? "#5189fa" : "#cbd5e1"}
      />
      {compact || (
        <span
          className={clsx(
            "whitespace-nowrap",
            active
              ? "text-md-s text-brand-primary tablet:text-lg-s"
              : "text-md-r text-text-primary tablet:text-lg-r"
          )}
        >
          {title}
        </span>
      )}
    </div>
  );
}
