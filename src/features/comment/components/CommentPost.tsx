import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react";
import { PostTaskCommentParams, TaskCommentResult } from "../apis";

interface CommentPostProps {
  taskId: number;
  onSubmit: UseMutateFunction<
    TaskCommentResult,
    Error,
    PostTaskCommentParams,
    unknown
  >;
  isPending: boolean;
  profileImage?: string;
  className?: string;
  horizontalPadding?: number;
}

export default function CommentPost({
  taskId,
  onSubmit,
  isPending,
  profileImage,
  className,
  horizontalPadding,
}: CommentPostProps) {
  const [content, setContent] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resizeTextarea = (
    textarea: HTMLTextAreaElement | null,
    { resize = true }: { resize?: boolean } = {}
  ) => {
    if (!textarea) return;
    textarea.style.height = "0px";
    if (resize) {
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    resizeTextarea(e.currentTarget);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key !== "Enter" || e.shiftKey) return;

    e.preventDefault();
    handleSubmit();
  };

  const handleSubmit = () => {
    if (!content.trim() || isPending) {
      return;
    }

    onSubmit(
      { taskId, content: content.trim() },
      {
        onSuccess: () => {
          setContent("");
          resizeTextarea(textareaRef.current, { resize: false });
        },
      }
    );
  };

  useEffect(() => {
    resizeTextarea(textareaRef.current);
  }, []);

  return (
    <div
      className={clsx("flex w-full items-start gap-4", className)}
      style={{
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
      }}
    >
      <div className="mt-2">
        <Avatar source={profileImage ?? ""} size="medium" />
      </div>

      <div className="flex flex-1 items-start justify-between border-y border-border-primary p-3">
        <textarea
          ref={textareaRef}
          value={content}
          maxLength={300}
          onChange={handleTextareaChange}
          onKeyDown={handleKeyDown}
          placeholder="댓글을 달아주세요"
          className="min-h-6 w-full resize-none bg-transparent text-sm leading-6 text-text-primary outline-none placeholder:text-text-default"
        />
        <button
          aria-label="댓글 등록"
          onClick={handleSubmit}
          disabled={!content.trim()}
          className="ml-2 flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-full bg-icon-brand text-white hover:bg-interaction-hover disabled:cursor-auto disabled:bg-icon-primary"
        >
          <Icon name="arrowUp" />
        </button>
      </div>
    </div>
  );
}
