import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import Dropdown from "@/components/dropdown";
import Icon from "@/components/icon";
import { Alert } from "@/components/modal";
import { PostComment } from "@/features/boards/api/index";
import { useResponsive } from "@/hooks/use-responsive";
import type { ArticleComment } from "@/types/comment";
import { formatDate } from "@/utils/format-date";
import { UseMutationResult } from "@tanstack/react-query";
import { overlay } from "overlay-kit";
import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";

interface ArticleCommentProps {
  commentCount?: number;
  comment?: ArticleComment[];
  userImage?: string;
  id: number;
  currentUserId?: number;
  postCommentMutation: UseMutationResult<
    PostComment,
    Error,
    { id: number; content: string }
  >;
  patchCommentMutation: UseMutationResult<
    ArticleComment,
    Error,
    { commentId: number; content: string }
  >;
  deleteCommentMutation: UseMutationResult<ArticleComment, Error, number>;
}

export default function ArticleComment({
  commentCount,
  comment,
  userImage,
  id,
  currentUserId,
  postCommentMutation,
  patchCommentMutation,
  deleteCommentMutation,
}: ArticleCommentProps) {
  const { isMobile } = useResponsive();
  const [commentContent, setCommentContent] = useState("");
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const editInputRef = useRef<HTMLInputElement>(null);

  const commentDropdownOptions = (item: ArticleComment) => [
    {
      label: "수정하기",
      value: "edit",
      action: () => {
        setEditCommentId(item.id);
        setEditContent(item.content);
      },
    },
    {
      label: "삭제하기",
      value: "delete",
      action: () => {
        alertDeleteComment(item.id);
      },
    },
  ];

  const alertDeleteComment = (commentId: number) => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <Alert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="댓글을 삭제하시겠어요?"
          message={`삭제된 댓글은 다시 복구할 수 없습니다.`}
          actions={[
            <Button
              key="alert-close"
              variant="outlinedSecondary"
              title="닫기"
              onClick={close}
            />,
            <Button
              key="alert-action"
              variant="danger"
              title="삭제"
              onClick={() => {
                handleDeleteComment(commentId);
                close();
              }}
            />,
          ]}
        />
      ),
      { overlayId: "delete-article-alert" }
    );
  };

  const handleSubmitComment = () => {
    if (commentContent.trim() === "") return;
    postCommentMutation.mutate({ id, content: commentContent });
    setCommentContent("");
  };

  const handleSubmitCommentKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmitComment();
    }
  };

  const handleEditComment = (commentId: number, content: string) => {
    patchCommentMutation.mutate(
      { commentId, content },
      {
        onSuccess: () => {
          setEditCommentId(null);
        },
      }
    );
  };

  const handleEditCommentKeyDown = (
    e: KeyboardEvent<HTMLInputElement>,
    commentId: number
  ) => {
    if (e.key === "Enter" && editContent.trim() !== "") {
      handleEditComment(commentId, editContent);
    }
  };

  const handleDeleteComment = (commentId: number) => {
    deleteCommentMutation.mutate(commentId);
  };

  useEffect(() => {
    if (editCommentId !== null && editInputRef.current) {
      editInputRef.current.focus();
    }
  }, [editCommentId]);

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
          <Avatar source={userImage} size={isMobile ? "small" : "medium"} />
          <div className="flex h-12 flex-1 items-center justify-between border-t border-b border-border-primary">
            <input
              type="text"
              value={commentContent}
              onChange={(e) => setCommentContent(e.target.value)}
              placeholder="댓글을 달아주세요"
              onKeyDown={(e) => {
                handleSubmitCommentKeyDown(e);
              }}
              className="w-52 text-text-default placeholder:text-xs-r focus:outline-none tablet:w-[420px] desktop:w-[660px]"
            />
            <button
              onClick={handleSubmitComment}
              disabled={
                postCommentMutation.isPending || commentContent.trim() === ""
              }
              className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-icon-primary"
            >
              <Icon name="arrowUp" />
            </button>
          </div>
        </div>
      </div>
      {comment && comment.length > 0 ? (
        comment.map((item: ArticleComment) => {
          const getCommentDropdownOptions = commentDropdownOptions(item);
          return (
            <div
              key={item.id}
              className="border-t border-t-border-primary py-3 tablet:py-5"
            >
              <div className="flex h-[54px] gap-2">
                <div className="relative h-6 w-6 tablet:h-8 tablet:w-8">
                  <Avatar
                    source={item.writer.image}
                    size={isMobile ? "small" : "medium"}
                  />
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
                          options={getCommentDropdownOptions}
                          direction="bottom"
                          alignment="right"
                        />
                      </button>
                    )}
                  </div>
                  {editCommentId === item.id ? (
                    <div className="flex h-4 justify-between gap-2 tablet:h-[17px]">
                      <input
                        ref={editInputRef}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        onKeyDown={(e) => {
                          handleEditCommentKeyDown(e, item.id);
                        }}
                        className="w-full rounded-sm pl-1 text-xs-r text-text-primary focus:outline-1 tablet:text-md-r"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleEditComment(item.id, editContent)
                          }
                          className="w-10 cursor-pointer rounded bg-brand-primary text-xs-r text-white disabled:cursor-not-allowed disabled:bg-slate-500 tablet:w-14 tablet:text-md-r"
                          disabled={
                            editContent.trim() === "" ||
                            patchCommentMutation.isPending
                          }
                        >
                          수정
                        </button>
                        <button
                          onClick={() => setEditCommentId(null)}
                          className="w-10 cursor-pointer rounded bg-slate-500 text-xs-r text-white tablet:w-14 tablet:text-md-r"
                        >
                          취소
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm-m text-text-primary tablet:text-md-r">
                      {item.content}
                    </div>
                  )}

                  <span className="text-xs-r text-slate-400 tablet:text-md-m">
                    {formatDate(item.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div className="flex h-[120px] items-center justify-center text-md-r text-text-default">
          아직 작성한 댓글이 없습니다.
        </div>
      )}
    </>
  );
}
