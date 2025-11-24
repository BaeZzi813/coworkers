import Icon from "@/components/icon";
import { isTaskListDone } from "@/features/tasklist/utils";
import { TaskList } from "@/types/task";
import { clsx } from "clsx";
import TeamPageTaskListCard from "./TeamPageTaskListCard";

interface Props {
  className?: string;
  taskLists: TaskList[];
}

export default function TeamPageTasksBoard({ className, taskLists }: Props) {
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
    <div className={clsx("flex flex-col gap-[30px]", className)}>
      <div>
        할 일 목록{" "}
        <span className="text-lg-r text-text-default">
          ({taskLists.length}개)
        </span>
      </div>
      <div className="flex w-full gap-4">
        <Column title="할 일" taskLists={toDoLists} />
        <Column title="진행중" taskLists={inProgressLists} />
        <Column title="완료" taskLists={doneLists} done />
      </div>
    </div>
  );
}

function Column({
  title,
  taskLists,
  done = false,
}: {
  title: string;
  taskLists: TaskList[];
  done?: boolean;
}) {
  const handleAddClick = () => {
    // TODO: 할 일 목록 만들기 alert
    console.log("Add Task List");
  };

  return (
    <div className="flex w-full grow flex-col gap-5">
      <div className="flex h-[38px] items-center justify-between rounded-xl bg-state-200 pr-2 pl-5">
        <span className="text-md-m text-text-primary">{title}</span>
        <button
          className="cursor-pointer rounded-lg border border-state-300 bg-background-primary p-1"
          onClick={handleAddClick}
        >
          <Icon name="plus" size="small" color="var(--color-state-400)" />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {taskLists.map((taskList) => (
          <TeamPageTaskListCard
            key={taskList.id}
            taskList={taskList}
            done={done}
          />
        ))}
      </div>
    </div>
  );
}
