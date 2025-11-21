import AvatarMD from "@/assets/images/avatar-placeholder-md.svg";
import AvatarSM from "@/assets/images/avatar-placeholder-sm.svg";
import Dropdown from "@/components/dropdown";
import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import { Comment } from "@/types/boards-comment";
import { formatDate } from "@/utils/format-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { useState } from "react";
import { postCommentById } from "../api";

export default function ArticleComment({
  commentCount,
  comment,
  articleDropdownOptions,
  userImage,
  id,
  currentUserId,
}) {
  const { isMobile } = useResponsive();
  const queryClient = useQueryClient();
  const [commentContent, setCommentContent] = useState("");

  const commnetMutation = useMutation({
    mutationFn: (data: { id: number; content: string }) =>
      postCommentById(data.id, { content: data.content }),
    onSuccess: (newComment) => {
      queryClient.invalidateQueries({ queryKey: ["comment", id] });
      setCommentContent("");
    },
    onError: (error) => {
      console.error("댓글 작성 실패:", error);
    },
  });

  const handleSubmitComment = () => {
    if (commentContent.trim() === "") return;
    commnetMutation.mutate({ id, content: commentContent });
  };

  return (
    <>
      <div className="mb-5 flex flex-col gap-3">
        <div className="flex items-center gap-1">
          <div className="text-md-b tablet:text-2lg-b">댓글</div>
          <span className="text-md-b text-brand-primary tablet:text-2lg-b">
            {commentCount}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div>
            {userImage ? (
              <Image
                src={userImage}
                alt="유저 이미지"
                width={isMobile ? 24 : 32}
                height={isMobile ? 24 : 32}
              />
            ) : isMobile ? (
              <AvatarSM className="h-6 w-6" />
            ) : (
              <AvatarMD className="h-8 w-8" />
            )}
          </div>
          <div className="flex h-12 flex-1 items-center justify-between border-t border-b border-border-primary">
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="댓글을 달아주세요"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSubmitComment();
                }
              }}
              className="w-52 text-text-default placeholder:text-xs-r focus:outline-none tablet:w-[420px] desktop:w-[660px]"
            />
            <button
              onClick={handleSubmitComment}
              disabled={
                commnetMutation.isPending || commentContent.trim() === ""
              }
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-icon-primary"
            >
              <Icon name="arrowUp" />
            </button>
          </div>
        </div>
      </div>
      {comment && comment.length > 0 ? (
        comment.map((item: Comment) => (
          <div
            key={item.id}
            className="border-t border-t-border-primary py-3 tablet:py-5"
          >
            <div className="flex h-[54px] gap-2">
              <div className="relative h-6 w-6 tablet:h-8 tablet:w-8">
                {item.writer.image ? (
                  <Image
                    src={item.writer.image}
                    alt="댓글작성자 이미지"
                    fill
                    className="rounded-md"
                  />
                ) : isMobile ? (
                  <AvatarSM className="h-6 w-6" />
                ) : (
                  <AvatarMD className="h-8 w-8" />
                )}
              </div>
              <div className="flex w-full flex-col gap-1">
                <div className="flex justify-between">
                  <div className="text-xs-s text-text-primary tablet:text-md-b">
                    {item.writer.nickname}
                  </div>
                  {item.writer.id === currentUserId && (
                    <button className="cursor-pointer">
                      <Dropdown
                        anchor={<Icon name="dots" size="small" />}
                        options={articleDropdownOptions}
                        direction="bottom"
                        alignment="right"
                      />
                    </button>
                  )}
                </div>
                <div className="text-sm-m text-text-primary tablet:text-md-r">
                  {item.content}
                </div>
                <span className="text-xs-r text-slate-400 tablet:text-md-m">
                  {formatDate(item.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="flex h-[120px] items-center justify-center text-md-r text-text-default">
          아직 작성한 댓글이 없습니다.
        </div>
      )}
    </>
  );
}
