import { openDeleteAlert } from "@/components/modal/DeleteAlert";
import clsx from "clsx";
import { useTaskCommentMutation } from "../query/use-comment-mutation";
import { CommentModel } from "./CommentItem";
import CommentList from "./CommentList";
import CommentPost from "./CommentPost";

interface CommentSectionProps {
  comments: CommentModel[];
  taskId: number;
  className?: string;
  horizontalPadding?: number;
}

export default function CommentSection({
  comments,
  taskId,
  className,
  horizontalPadding,
}: CommentSectionProps) {
  const {
    postMutation,
    patchMutation: { mutate: patchCommentMutate },
    deleteMutation,
  } = useTaskCommentMutation({ taskId });

  const handleEditComment = patchCommentMutate;
  const handleDeleteComment = (commentId: number) => {
    openDeleteAlert({
      title: `댓글을 정말 삭제하시겠어요?`,
      onDelete: () => {
        deleteMutation.mutate({ taskId, commentId });
      },
    });
  };

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
      <CommentPost
        taskId={taskId}
        onSubmit={postMutation.mutate}
        isPending={postMutation.isPending}
        horizontalPadding={horizontalPadding}
      />
      <CommentList
        comments={comments}
        taskId={taskId}
        onEdit={handleEditComment}
        onDelete={handleDeleteComment}
        horizontalPadding={horizontalPadding}
      />
    </section>
  );
}
