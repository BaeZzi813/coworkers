import { getTaskList } from "@/features/tasklist/apis/mock";
import TaskGroupList from "@/features/tasklist/components/TaskGroupList";
import TaskListContent from "@/features/tasklist/components/TaskListContent";
import TeamHeader from "@/features/tasklist/components/TeamHeader";
import { useResponsive } from "@/hooks/use-responsive";
import { useSidebarStore } from "@/stores/sidebar-store";
import { TaskGroup } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function TaskListPage() {
  const { isDesktop } = useResponsive();
  const { setFold } = useSidebarStore();
  useEffect(() => {
    setFold(!isDesktop);
  }, [isDesktop, setFold]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const { data: taskList } = useQuery<TaskGroup[]>({
    queryKey: ["task-list"],
    queryFn: getTaskList,
  });

  const defaultTaskId =
    selectedTaskId ?? (taskList?.length ? taskList[0].id : null);

  const defaultTaskName = selectedTaskId
    ? (taskList?.find((t) => t.id === selectedTaskId)?.name ?? "")
    : (taskList?.[0]?.name ?? "");

  return (
    <div className="flex h-dvh flex-col overflow-x-hidden bg-background-secondary p-4 tablet:px-[26px] tablet:py-[70px] desktop:px-[84px] desktop:py-[120px]">
      <div className="flex max-w-[1120px] flex-1 flex-col gap-5 tablet:gap-10 desktop:min-w-[780px] desktop:gap-7">
        <TeamHeader teamName="경영관리팀" isAdmin />

        <div className="flex flex-1 flex-col gap-[22px] tablet:gap-7 desktop:flex-row desktop:gap-6">
          <TaskGroupList
            isDesktop={isDesktop}
            taskList={taskList}
            selectedTaskId={defaultTaskId}
            onSelectTask={setSelectedTaskId}
          />

          <TaskListContent
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            defaultTaskId={defaultTaskId}
            defaultTaskName={defaultTaskName}
          />
        </div>
      </div>
    </div>
  );
}
