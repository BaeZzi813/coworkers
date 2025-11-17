import Icons, { IconName } from "./icons";
import type { IconSize } from "./types";

export interface IconProps {
  name: IconName;
  size?: IconSize;
  color?: string;
}

export default function Icon({ name, size = "large", color }: IconProps) {
  const Component = Icons[name][size];
  return Component && <Component color={color} fill={color} />;
}
