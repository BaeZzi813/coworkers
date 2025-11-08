import Icons, { IconName } from "./icons";
import type { IconSize } from "./types";

export interface IconProps {
  name: IconName;
  size?: IconSize;
}

export default function Icon({ name, size = "large" }: IconProps) {
  const Component = Icons[name][size];
  return Component ? <Component /> : null;
}
