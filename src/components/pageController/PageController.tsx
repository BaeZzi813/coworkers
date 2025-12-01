import clsx from "clsx";
import Icon from "../icon";

interface PageControllerProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function PageController({
  page,
  totalPages,
  onPageChange,
  className,
}: PageControllerProps) {
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  return (
    <div className={clsx("flex items-center justify-between", className)}>
      <div className="w-[52px]" />
      <div className="flex flex-1 justify-center gap-1.5">
        {Array.from({ length: totalPages }).map((_, index) => {
          const isActive = index + 1 === page;
          return (
            <button
              key={index}
              onClick={() => onPageChange(index + 1)}
              className={clsx(
                "h-2 cursor-pointer rounded-full",
                isActive ? "w-4 bg-slate-400" : "w-2 bg-slate-300"
              )}
            />
          );
        })}
      </div>
      <div className="flex gap-1">
        <button
          disabled={!hasPrev}
          onClick={() => onPageChange(page - 1)}
          className={clsx(
            "flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-background-primary",
            hasPrev && "cursor-pointer"
          )}
        >
          <Icon name="chevronLeft" size="small" color="white" />
        </button>
        <button
          disabled={!hasNext}
          onClick={() => onPageChange(page + 1)}
          className={clsx(
            "flex h-6 w-6 items-center justify-center rounded-full border border-slate-300 bg-background-primary",
            hasNext && "cursor-pointer"
          )}
        >
          <Icon name="chevronRight" size="small" color="white" />
        </button>
      </div>
    </div>
  );
}
