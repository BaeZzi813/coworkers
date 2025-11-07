import Icon from "@/components/icon";
import { ReactNode } from "react";

interface Props {
  header?: ReactNode;
  title: string;
  message?: string;
  content?: ReactNode;
  actions?: ReactNode[];
  onClose?: () => void;
}

export default function Alert({
  header,
  title,
  message,
  content,
  actions = [],
  onClose,
}: Props) {
  return (
    <div className="w-[384px] rounded-3xl bg-background-primary px-4 pt-4 pb-8">
      <div className="flex h-6 justify-end">
        {onClose && (
          <button className="cursor-pointer" onClick={onClose}>
            <Icon name="xmark" />
          </button>
        )}
      </div>
      <div className="mx-8 flex flex-col">
        {header && <div className="mb-4 self-center">{header}</div>}
        <div className="flex flex-col items-center gap-2">
          <div className="text-lg-m">{title}</div>
          {message && (
            <div className="text-md-m text-center whitespace-pre-wrap">
              {message}
            </div>
          )}
        </div>
        {content && <div className="mt-4">{content}</div>}
        <div className="mt-6 flex gap-2">{actions.map((action) => action)}</div>
      </div>
    </div>
  );
}
