import clsx from "clsx";
import { CommentModel } from "./CommentItem";
import CommentList from "./CommentList";
import CommentPost from "./CommentPost";

interface CommentSectionProps {
  comments: CommentModel[];
  onSubmit?: (content: string) => void;
  onEdit?: (commentId: number, newContent: string) => void;
  onDelete?: (commentId: number) => void;
  className?: string;
  horizontalPadding?: number;
}

export default function CommentSection({
  comments,
  onSubmit,
  onEdit,
  onDelete,
  className,
  horizontalPadding,
}: CommentSectionProps) {
  return (
    <section className={clsx("flex flex-col gap-4", className)}>
      <h2
        className="tabelt:text-2xl-b text-lg-b"
        style={{
          paddingLeft: horizontalPadding,
          paddingRight: horizontalPadding,
        }}
      >
        댓글<span className="ml-1 text-brand-primary">{comments.length}</span>
      </h2>
      <CommentPost onSubmit={onSubmit} horizontalPadding={horizontalPadding} />
      <CommentList
        comments={comments}
        onEdit={onEdit}
        onDelete={onDelete}
        horizontalPadding={horizontalPadding}
      />
    </section>
  );
}
