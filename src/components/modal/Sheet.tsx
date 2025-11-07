import { PropsWithChildren, ReactNode } from "react";

interface Props {
  title: string;
  message: string;
  content: ReactNode;
  action: ReactNode;
}

export default function Sheet({ title, message, content, action }: Props) {
  return (
    <div className="w-[384px] rounded-3xl bg-background-primary px-6 pt-8 pb-8">
      <div className="flex flex-col">
        <div className="flex flex-col items-center gap-4">
          <div className="text-lg-m">{title}</div>
          {message && (
            <div className="text-md-m text-center whitespace-pre-wrap text-text-default">
              {message}
            </div>
          )}
        </div>
        <div className="mt-6 mb-8">{content}</div>
        <div className="">{action}</div>
      </div>
    </div>
  );
}

function SheetSection({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <div className="text-lg-m mb-4 text-text-primary">{title}</div>
      {children}
    </div>
  );
}

Sheet.Section = SheetSection;
