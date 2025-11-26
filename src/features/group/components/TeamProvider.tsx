import { Group } from "@/types/group";
import { createContext, PropsWithChildren } from "react";

interface TeamContextValue {
  group: Group;
}

export const TeamContext = createContext<TeamContextValue | null>(null);

interface Props extends PropsWithChildren {
  group: Group;
}

export default function TeamProvider({ group, children }: Props) {
  return <TeamContext value={{ group }}>{children}</TeamContext>;
}
