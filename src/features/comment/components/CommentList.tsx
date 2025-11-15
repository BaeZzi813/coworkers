import clsx from "clsx";
import CommentItem, { Comment } from "./CommentItem";

interface CommentListProps {
  comments: Comment[];
  onEdit?: (commentId: number, newContent: string) => void;
  onDelete?: (commentId: number) => void;
  className?: string;
  horizontalPadding?: number;
}

export default function CommentList({
  comments,
  onEdit,
  onDelete,
  className,
  horizontalPadding,
}: CommentListProps) {
  return (
    <div className={clsx("flex w-full flex-col", className)}>
      {comments.map((comment) => (
        <CommentItem
          key={comment.commentId}
          {...comment}
          onEdit={onEdit}
          onDelete={onDelete}
          horizontalPadding={horizontalPadding}
        />
      ))}
    </div>
  );
}
