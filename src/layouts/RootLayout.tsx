import { Sidebar } from "@/components/gnb";
import { PropsWithChildren } from "react";

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex">
      <main className="grow">{children}</main>
    </div>
  );
}
