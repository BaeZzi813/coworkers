import clsx from "clsx";
import Dropdown, { type DropdownOption } from "../dropdown";
import Icon from "../icon";

type SelectSize = "large" | "small";

export type SelectOption = DropdownOption;

interface Props {
  className?: string;
  value?: SelectOption;
  placeholder?: string;
  options: SelectOption[];
  size?: SelectSize;
  onChange: (value: SelectOption) => void;
}

const typography: Record<SelectSize, string> = {
  large: "text-md-m",
  small: "text-xs-m",
};

export default function Select({
  className,
  value,
  placeholder,
  options,
  size = "large",
  onChange,
}: Props) {
  const Component = (
    <div
      className={clsx(
        className,
        size === "large" ? "rounded-xl" : "rounded-lg",
        size === "large" ? "px-3.5 py-2.5" : "p-2",
        `cursor-pointer border border-border-primary bg-background-primary`
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span
          className={clsx(
            typography[size],
            value ? "text-text-primary" : "text-text-default",
            "whitespace-nowrap"
          )}
        >
          {value?.label ?? placeholder ?? ""}
        </span>
        <Icon name="triangleDown" size="large" />
      </div>
    </div>
  );

  const handleSelect = (option: DropdownOption | string) => {
    onChange(option as SelectOption);
  };

  return (
    <Dropdown
      anchor={Component}
      options={options}
      alignment="fill"
      onSelect={handleSelect}
    />
  );
}
