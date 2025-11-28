import { Group } from "@/types/group";
import { createContext, PropsWithChildren, useContext } from "react";

interface TeamContextValue {
  group: Group;
  isAdmin: boolean;
}

export const TeamContext = createContext<TeamContextValue | null>(null);

type Props = TeamContextValue & PropsWithChildren;

export default function TeamProvider({ group, isAdmin, children }: Props) {
  return <TeamContext value={{ group, isAdmin }}>{children}</TeamContext>;
}

export function useTeamContext() {
  const context = useContext(TeamContext);

  if (!context) {
    throw new Error("useTeamContext must be used within a TeamProvider");
  }

  return context;
}
