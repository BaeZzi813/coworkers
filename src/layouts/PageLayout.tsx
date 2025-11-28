import clsx from "clsx";
import { HTMLAttributes, PropsWithChildren } from "react";

export default function PageLayout({
  className,
  children,
}: PropsWithChildren & HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="h-full bg-background-secondary">
      <div className={clsx("h-full w-full max-w-7xl", className)}>
        {children}
      </div>
    </div>
  );
}
