import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import { PatchTaskComentParams, TaskCommentResult } from "../apis";
import CommentItem, { CommentModel } from "./CommentItem";

interface CommentListProps {
  comments: CommentModel[];
  taskId: number;
  onEdit?: UseMutateFunction<
    TaskCommentResult,
    Error,
    PatchTaskComentParams,
    unknown
  >;
  onDelete?: (commentId: number) => void;
  className?: string;
  horizontalPadding?: number;
}

export default function CommentList({
  comments,
  taskId,
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
          taskId={taskId}
          onEdit={onEdit}
          onDelete={onDelete}
          horizontalPadding={horizontalPadding}
        />
      ))}
    </div>
  );
}
