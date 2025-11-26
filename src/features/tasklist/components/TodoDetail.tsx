import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import Dropdown from "@/components/dropdown";
import Icon from "@/components/icon";
import { getTasksComments } from "@/features/comment/apis/mock";
import { CommentSection } from "@/features/comment/components";
import { useEditDeleteMenu } from "@/hooks/use-edit-delete-menu";
import { useResponsive } from "@/hooks/use-responsive";
import { Comment } from "@/types/comment";
import { Task } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { getTodo } from "../apis/mock";
import { FREQUENCY_LABEL } from "../constants/task-frequency";
import { useToggleTodo } from "../hooks/useToggleTodo";

interface TodoDetailProps {
  taskId: number;
  todoId: number;
  close: () => void;
}

export function TodoDetail({ taskId, todoId, close }: TodoDetailProps) {
  const { isTablet, isDesktop } = useResponsive();
  const toggleTodo = useToggleTodo();

  const { anchor, options } = useEditDeleteMenu({
    onEdit: () => {},
    onDelete: () => {},
  });

  const { data: todo, isPending } = useQuery<Task | null>({
    queryKey: ["todo-detail", taskId, todoId],
    queryFn: () => getTodo(taskId, todoId),
    enabled: !!taskId && !!todoId,
  });
  const { data: commentsData = [] } = useQuery<Comment[]>({
    queryKey: ["comments", todoId],
    queryFn: () => getTasksComments(todoId),
    enabled: !!todoId,
    initialData: [],
  });

  if (!todo || isPending) return null;

  const handleToggleDone = () => {
    toggleTodo.mutate({ taskId, todoId, done: !todo.doneAt });
  };

  const comments = commentsData.map((comment) => ({
    commentId: comment.id,
    userId: comment.userId,
    name: comment.user.nickname,
    profileImageUrl: comment.user.image,
    content: comment.content,
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
  }));

  return (
    <>
      <div className="px-4 py-3 tablet:px-7 tablet:py-10 desktop:py-10">
        <button
          onClick={close}
          className="mb-5 cursor-pointer tablet:mb-[74px]"
        >
          <Icon name="xmark" size="large" />
        </button>

        <section className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <header className="flex w-full justify-between">
              <div className="flex items-center gap-3">
                <h2
                  className={clsx(
                    "text-xl-b tablet:text-2xl-b",
                    todo.doneAt && "text-text-default line-through"
                  )}
                >
                  {todo.name}
                </h2>
                {todo.doneAt && (
                  <span className="rounded-lg bg-brand-secondary px-2.5 py-1.5 text-md-b text-brand-primary">
                    완료
                  </span>
                )}
              </div>

              <Dropdown anchor={anchor} options={options} alignment="right" />
            </header>

            <div className="flex items-center gap-3">
              <Avatar size="medium" source={todo.writer.image ?? ""} />
              <p className="text-md-m">{todo.writer.nickname}</p>
            </div>

            <div className="flex w-full items-center justify-between">
              <div className="flex flex-col gap-2">
                <p className="flex gap-1.5">
                  <Icon name="calendar" />
                  <span className="text-xs-r text-text-default">시작 날짜</span>
                  <span className="ml-6 text-xs-r">
                    {new Date(todo.date).toLocaleDateString("ko-KR")}
                  </span>
                </p>
                <p className="flex gap-1.5">
                  <Icon name="repeat" color="transparent" />
                  <span className="text-xs-r text-text-default">반복 설정</span>
                  <span className="ml-6 text-xs-r">
                    {FREQUENCY_LABEL[todo.frequency]}
                  </span>
                </p>
              </div>

              <Button
                iconName="checkCompact"
                iconCustomColor="transparent"
                variant={todo.doneAt ? "outlinedPrimary" : "primary"}
                title={todo.doneAt ? "완료 취소하기" : "완료하기"}
                size="medium"
                isFullWidth={false}
                rounded
                className="fixed right-5 bottom-[30px] tablet:relative tablet:right-0 tablet:bottom-0"
                onClick={handleToggleDone}
              />
            </div>
          </div>

          <div className="h-px bg-border-primary" />

          <article
            className={clsx("w-full", !todo.description && "text-text-default")}
          >
            {todo.description || "등록된 설명이 없습니다."}
          </article>
        </section>
      </div>

      <CommentSection
        comments={comments}
        horizontalPadding={isDesktop ? 40 : isTablet ? 28 : 16}
        className="py-7 tablet:py-4"
      />
    </>
  );
}
