import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import Dropdown from "@/components/dropdown";
import { useUserQuery } from "@/features/user/query";
import { useEditDeleteMenu } from "@/hooks/use-edit-delete-menu";
import { UseMutateFunction } from "@tanstack/react-query";
import clsx from "clsx";
import { useState } from "react";
import { PatchTaskComentParams, TaskCommentResult } from "../apis";

export interface CommentModel {
  commentId: number;
  userId: number;
  name: string;
  profileImageUrl?: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface CommentItemProps extends CommentModel {
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

export default function CommentItem({
  commentId,
  userId,
  profileImageUrl,
  name,
  content,
  createdAt,
  updatedAt,
  taskId,
  onEdit,
  onDelete,
  className,
  horizontalPadding,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);
  const isEdited = createdAt !== updatedAt;

  const { user } = useUserQuery();

  const isMine = user?.id === userId;

  const { anchor, options } = useEditDeleteMenu({
    onEdit: () => {
      setIsEditing(true);
    },
    onDelete: () => {
      onDelete?.(commentId);
    },
  });

  const handleEditSubmit = () => {
    if (!onEdit || editContent === content) {
      setIsEditing(false);
      return;
    }

    onEdit(
      { taskId, commentId, content: editContent },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      }
    );
  };
  const handleEditCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  return (
    <div
      className={clsx(
        isEditing ? "my-4 border-none bg-state-50" : "bg-background-primary",
        className
      )}
      style={{
        paddingLeft: horizontalPadding,
        paddingRight: horizontalPadding,
      }}
    >
      <div
        className={clsx(
          "flex w-full items-start gap-4 border-t border-gray-100 py-3",
          isEditing && "border-none"
        )}
      >
        <Avatar source={profileImageUrl ?? ""} size="medium" />

        <div className="flex flex-1 items-start justify-between">
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-md-b text-text-primary">{name}</p>

            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="my-1 w-full resize-none border-y border-border-primary bg-transparent px-1 py-3 text-md-r text-text-primary outline-none"
                rows={3}
              />
            ) : (
              <p className="text-md-r whitespace-pre-line text-text-primary">
                {content}
              </p>
            )}

            {isEditing ? (
              <div className="flex justify-end gap-2 pt-1">
                <button
                  onClick={handleEditCancel}
                  className="cursor-pointer px-3 text-md-s text-text-default"
                >
                  취소
                </button>
                <Button
                  title="수정하기"
                  variant="outlinedPrimary"
                  size="small"
                  isFullWidth={false}
                  onClick={() => handleEditSubmit()}
                />
              </div>
            ) : (
              <p className="text-md-m text-state-400">
                {new Date(createdAt).toLocaleDateString("ko-KR")}
                {isEdited && (
                  <span className="ml-0.5 text-xs-r opacity-70">(수정됨)</span>
                )}
              </p>
            )}
          </div>

          {isMine && !isEditing && (
            // <EditDropdown />
            <Dropdown anchor={anchor} options={options} alignment="right" />
          )}
        </div>
      </div>
    </div>
  );
}
