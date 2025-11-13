import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import Dropdown, { DropdownOption } from "@/components/dropdown";
import Icon from "@/components/icon";
import clsx from "clsx";
import { useState } from "react";

interface User {
  id: number;
  nickname: string;
  image?: string;
}

export interface CommentItemProps {
  id: number;
  user?: User;
  writer?: User;
  userId?: number;
  taskId?: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  onEdit?: (id: number, content: string) => void;
  onDelete?: (id: number) => void;
}

export default function CommentItem({
  id,
  user,
  writer,
  userId,
  content,
  createdAt,
  onEdit,
  onDelete,
}: CommentItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(content);

  const options: DropdownOption[] = [
    { label: "수정하기", value: "edit" },
    { label: "삭제하기", value: "delete" },
  ];

  const handleSelect = (option: DropdownOption) => {
    switch (option.value) {
      case "edit":
        setIsEditing(true);
        break;
      case "delete":
        onDelete?.(id);
        break;
    }
  };

  const handleEditClick = (id: number, editContent: string) => {
    onEdit?.(id, editContent);
    setIsEditing(false);
  };
  const handleEditCancel = () => {
    setEditContent(content);
    setIsEditing(false);
  };

  const currentUserId = 5; // 테스트용 임시 id
  const isMine = currentUserId === userId;
  const author = user ?? writer;
  if (!author) return null;

  return (
    <div
      className={clsx(
        "w-full border-b border-gray-100",
        isEditing ? "bg-state-50" : "bg-white"
      )}
    >
      <div className="flex w-full items-start gap-4 px-4 py-3">
        <Avatar source={author.image ?? ""} size="medium" />

        <div className="flex flex-1 items-start justify-between">
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-md-b text-text-primary">{author.nickname}</p>

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
                  onClick={() => handleEditClick(id, editContent)}
                />
              </div>
            ) : (
              <p className="text-md-m text-state-400">
                {new Date(createdAt).toLocaleDateString("ko-KR")}
              </p>
            )}
          </div>

          {isMine && !isEditing && (
            <Dropdown
              anchor={
                <button aria-label="댓글 설정 열기" className="cursor-pointer">
                  <Icon name="dots" size="small" />
                </button>
              }
              options={options}
              alignment="left"
              onSelect={(option) => handleSelect(option as DropdownOption)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
