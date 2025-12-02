import clsx from "clsx";
import CommentItem, { CommentModel } from "./CommentItem";

interface CommentListProps {
  comments: CommentModel[];
  onEdit?: (commentId: number, newContent: string) => void;
  editOnSuccess: boolean;
  onDelete?: (commentId: number) => void;
  className?: string;
  horizontalPadding?: number;
}

export default function CommentList({
  comments,
  onEdit,
  editOnSuccess,
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
          editOnSuccess={editOnSuccess}
          onDelete={onDelete}
          horizontalPadding={horizontalPadding}
        />
      ))}
    </div>
  );
}
