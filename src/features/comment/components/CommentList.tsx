import clsx from "clsx";
import CommentItem, { CommentItemProps } from "./CommentItem";

interface CommentListProps {
  comments: CommentItemProps[];
  onEdit?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
  className?: string;
  itemClassName?: string;
}

export default function CommentList({
  comments,
  onEdit,
  onDelete,
  className,
  itemClassName,
}: CommentListProps) {
  return (
    <div className={clsx("flex w-full flex-col", className)}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          onEdit={onEdit}
          onDelete={onDelete}
          className={itemClassName}
        />
      ))}
    </div>
  );
}
