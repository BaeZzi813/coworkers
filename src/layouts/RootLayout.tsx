import { Sidebar } from "@/components/gnb";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen">
      <Sidebar className="relative z-10" />
      <main className="grow overflow-y-scroll">{children}</main>
    </div>
  );
}
