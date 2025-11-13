import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import { ChangeEvent, KeyboardEvent, useRef, useState } from "react";

interface CommentPostProps {
  profileImage?: string;
  onSubmit?: (content: string) => void;
}

export default function CommentPost({
  profileImage,
  onSubmit,
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
    if (!content.trim()) return;
    onSubmit?.(content);
    setContent("");
    resizeTextarea(textareaRef.current, { resize: false });
  };

  return (
    <div className="flex w-full items-start gap-4">
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
          className="ml-2 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-icon-brand text-white hover:bg-interaction-hover disabled:cursor-auto disabled:bg-icon-primary"
        >
          <Icon name="arrowUp" />
        </button>
      </div>
    </div>
  );
}
