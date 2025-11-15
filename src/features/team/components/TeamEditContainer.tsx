import clsx from "clsx";
import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  className?: string;
  header: string;
  footer: string;
}

export default function TeamEditContainer({
  className,
  header,
  footer,
  children,
}: Props) {
  return (
    <div
      className={clsx(
        "w-full max-w-[550px] min-w-[343px] rounded-[20px] bg-background-primary px-6 pt-14 pb-16 tablet:px-[45px]",
        className
      )}
    >
      <header className="mb-10 text-xl-b text-text-primary tablet:text-2xl-b">
        {header}
      </header>
      <div>{children}</div>
      <footer className="mt-6 text-center text-xs-r text-text-default tablet:text-lg-r">
        {footer}
      </footer>
    </div>
  );
}
