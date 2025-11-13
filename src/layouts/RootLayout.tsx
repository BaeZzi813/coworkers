import { Sidebar } from "@/components/gnb";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="grow overflow-x-hidden">{children}</main>
    </div>
  );
}
