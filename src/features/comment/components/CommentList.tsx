import CommentItem, { CommentItemProps } from "./CommentItem";

interface CommentListProps {
  comments: CommentItemProps[];
  onEdit?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
}

export default function CommentList({
  comments,
  onEdit,
  onDelete,
}: CommentListProps) {
  return (
    <div className="flex w-full flex-col">
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          {...comment}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
