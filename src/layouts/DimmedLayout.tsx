import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
  isDimmed: boolean;
}

export default function DimmedLayout({ isDimmed, children }: Props) {
  return (
    <>
      {children}
      {isDimmed && <div className="fixed inset-0 bg-black/10" />}
    </>
  );
}
