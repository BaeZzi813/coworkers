type ChipSize = "large" | "small";

interface Props {
  title: string;
  count: number;
  size?: ChipSize;
  selected?: boolean;
}

const padding: Record<ChipSize, string> = {
  large: "px-4 py-3",
  small: "px-3 py-2",
};

const titleTypography: Record<ChipSize, string> = {
  large: "text-lg-m",
  small: "text-sm-m",
};

const countTypography: Record<ChipSize, string> = {
  large: "text-lg-b",
  small: "text-md-b",
};

const gap: Record<ChipSize, string> = {
  large: "gap-[6px]",
  small: "gap-1",
};

function background(selected: boolean) {
  return selected ? "bg-brand-primary" : "bg-background-primary";
}

function titleColor(selected: boolean) {
  return selected ? "text-text-inverse" : "text-text-primary";
}

function countColor(selected: boolean) {
  return selected ? "text-text-inverse" : "text-brand-primary";
}

export default function CountChip({
  title,
  count,
  size = "large",
  selected = false,
}: Props) {
  return (
    <div
      className={`rounded-full border border-border-primary ${padding[size]} ${background(selected)} ${titleColor(selected)}`}
    >
      <div className={`flex items-center ${gap[size]}`}>
        <span className={`${titleTypography[size]} ${titleColor(selected)}`}>
          {title}
        </span>
        <span className={`${countTypography[size]} ${countColor(selected)}`}>
          {count}
        </span>
      </div>
    </div>
  );
}
