import { NavigationBar, Sidebar } from "@/components/gnb";
import { useResponsive } from "@/hooks/use-responsive";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  const { isMobile } = useResponsive();

  if (isMobile) {
    return (
      <div>
        <NavigationBar />
        <main>{children}</main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar className="relative z-10" />
      <main className="grow">{children}</main>
    </div>
  );
}
