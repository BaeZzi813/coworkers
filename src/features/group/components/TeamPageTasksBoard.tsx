import { isTaskListDone } from "@/features/tasklist/utils";
import { useResponsive } from "@/hooks/use-responsive";
import { TaskList } from "@/types/task";
import Link from "next/link";
import { PropsWithChildren, useContext } from "react";
import TeamPageMembersList from "./TeamPageMembersList";
import TeamPageTaskListCard from "./TeamPageTaskListCard";
import { TeamContext } from "./TeamProvider";

interface Props {
  taskLists: TaskList[];
}

export default function TeamPageTasksBoard({ taskLists }: Props) {
  const group = useContext(TeamContext)!.group;
  const { isDesktop } = useResponsive();

  return (
    <div className="flex items-start gap-8">
      {taskLists.length > 0 ? (
        <TaskListsBoard groupId={group.id} taskLists={taskLists} />
      ) : (
        <EmptyTaskListsBoard isDesktop={isDesktop} />
      )}
      {isDesktop && <TeamPageMembersList members={group.members} />}
    </div>
  );
}

function EmptyTaskListsBoard({ isDesktop }: { isDesktop: boolean }) {
  const EmptyMessage = (
    <div className="flex h-[150px] w-full items-center justify-center text-md-r text-text-default desktop:h-[328px]">
      아직 할 일 목록이 없어요.
    </div>
  );

  return (
    <div className="flex grow flex-col desktop:gap-5">
      <BoardSection>
        <div className="flex w-full flex-col gap-3">
          <ColumnHeader title="할 일" />
          {isDesktop || EmptyMessage}
        </div>
        <ColumnHeader title="진행중" />
        <ColumnHeader title="완료" />
      </BoardSection>
      {isDesktop && EmptyMessage}
    </div>
  );
}

function TaskListsBoard({
  groupId,
  taskLists,
}: {
  groupId: number;
  taskLists: TaskList[];
}) {
  const doneLists = taskLists.filter(isTaskListDone);
  const doneIds = doneLists.map((taskList) => taskList.id);

  const now = new Date();
  const inProgressLists = taskLists.filter((taskList) => {
    const tasks = [...taskList.tasks];
    tasks.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return dateA - dateB;
    });

    if (tasks.length === 0 || doneIds.includes(taskList.id)) {
      return false;
    }

    const diff = now.getTime() - new Date(tasks[0].date).getTime();
    return diff >= 0;
  });
  const inProgressIds = inProgressLists.map((taskList) => taskList.id);

  const toDoLists = taskLists.filter(
    (taskList) => ![...doneIds, ...inProgressIds].includes(taskList.id)
  );

  return (
    <BoardSection>
      <Column groupId={groupId} title="할 일" taskLists={toDoLists} />
      <Column groupId={groupId} title="진행중" taskLists={inProgressLists} />
      <Column groupId={groupId} title="완료" taskLists={doneLists} done />
    </BoardSection>
  );
}

function BoardSection({ children }: PropsWithChildren) {
  return (
    <div className="flex w-full grow flex-col gap-8 desktop:flex-row desktop:gap-4">
      {children}
    </div>
  );
}

function Column({
  groupId,
  title,
  taskLists,
  done = false,
}: {
  groupId: number;
  title: string;
  taskLists: TaskList[];
  done?: boolean;
}) {
  return (
    <div className="flex w-full grow flex-col gap-3 desktop:gap-5">
      <ColumnHeader title={title} />
      <ColumnBody groupId={groupId} taskLists={taskLists} done={done} />
    </div>
  );
}

function ColumnHeader({ title }: { title: string }) {
  return (
    <div className="flex h-[38px] w-full items-center justify-between rounded-xl bg-state-200 pr-2 pl-5">
      <span className="text-md-m text-text-primary">{title}</span>
    </div>
  );
}

function ColumnBody({
  groupId,
  taskLists,
  done,
}: {
  groupId: number;
  taskLists: TaskList[];
  done: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      {taskLists.map((taskList) => (
        <Link href={`/${groupId}/tasklist?id=${taskList.id}`} key={taskList.id}>
          <TeamPageTaskListCard taskList={taskList} done={done} />
        </Link>
      ))}
    </div>
  );
}
