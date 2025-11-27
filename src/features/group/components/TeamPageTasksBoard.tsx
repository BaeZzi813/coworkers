import { isTaskListDone } from "@/features/tasklist/utils";
import { useResponsive } from "@/hooks/use-responsive";
import { TaskList } from "@/types/task";
import { useRouter } from "next/router";
import TeamPageMembersList from "./TeamPageMembersList";
import TeamPageTaskListCard from "./TeamPageTaskListCard";
import { useTeamContext } from "./TeamProvider";

interface Props {
  taskLists: TaskList[];
}

export default function TeamPageTasksBoard({ taskLists }: Props) {
  const { group } = useTeamContext();
  const { isDesktop } = useResponsive();
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
    <div className="flex items-start gap-8">
      <div className="flex w-full grow flex-col gap-8 desktop:flex-row desktop:gap-4">
        <Column groupId={group.id} taskLists={toDoLists} title="할 일" />
        <Column groupId={group.id} taskLists={inProgressLists} title="진행중" />
        <Column groupId={group.id} taskLists={doneLists} title="완료" done />
      </div>
      {isDesktop && <TeamPageMembersList members={group.members} />}
    </div>
  );
}

function Column({
  groupId,
  taskLists,
  title,
  done = false,
}: {
  groupId: number;
  taskLists: TaskList[];
  title: string;
  done?: boolean;
}) {
  const router = useRouter();

  const handleTaskListClick = (id: number) => {
    router.push(`/${groupId}/tasklist?id=${id}`);
  };

  return (
    <div className="flex w-full grow flex-col gap-3 desktop:gap-5">
      <div className="flex h-[38px] items-center justify-between rounded-xl bg-state-200 pr-2 pl-5">
        <span className="text-md-m text-text-primary">{title}</span>
      </div>
      <div className="flex flex-col gap-2">
        {taskLists.map((taskList) => (
          <button
            key={taskList.id}
            className="cursor-pointer text-left"
            onClick={() => handleTaskListClick(taskList.id)}
          >
            <TeamPageTaskListCard taskList={taskList} done={done} />
          </button>
        ))}
      </div>
    </div>
  );
}
