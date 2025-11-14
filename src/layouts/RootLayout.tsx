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
    <div className="flex h-screen">
      <Sidebar className="relative z-10" />
      <main className="grow overflow-x-hidden">{children}</main>
    </div>
  );
}
