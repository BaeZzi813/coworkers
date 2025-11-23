import { getTaskList } from "@/features/tasklist/apis/mock";
import TaskGroupList from "@/features/tasklist/components/TaskGroupList";
import TaskListContent from "@/features/tasklist/components/TaskListContent";
import TeamHeader from "@/features/tasklist/components/TeamHeader";
import { TodoDetail } from "@/features/tasklist/components/TodoDetail";
import { useResponsive } from "@/hooks/use-responsive";
import { useSidebarStore } from "@/stores/sidebar-store";
import { TaskList } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TaskListPage() {
  const { isDesktop } = useResponsive();
  const { setFold } = useSidebarStore();

  useEffect(() => {
    setFold(!isDesktop);
  }, [isDesktop, setFold]);

  const { data: taskList = [] } = useQuery<TaskList[]>({
    queryKey: ["task-list"],
    queryFn: getTaskList,
  });

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [panelWidth, setPanelWidth] = useState(520);

  const selectedTask =
    selectedTaskId !== null
      ? (taskList.find((task) => task.id === selectedTaskId) ?? null)
      : (taskList[0] ?? null);

  const handleCloseDetailPanel = () => {
    setIsPanelOpen(false);
    setFold(false);
  };

  const selectTodo = (todoId: number) => {
    setSelectedTodoId(todoId);
    setIsPanelOpen(true);
    setFold(true);
  };

  const selectTask = (taskId: number) => {
    setSelectedTaskId(taskId);

    const task = taskList.find((task) => task.id === taskId);
    if (!task) {
      handleCloseDetailPanel();
      return;
    }

    const selectedDateKey = selectedDate.toISOString().slice(0, 10);
    const firstTodo = (task.tasks ?? []).find(
      (todo) => todo.date.slice(0, 10) === selectedDateKey
    );

    if (firstTodo) {
      setSelectedTodoId(firstTodo.id);
      setIsPanelOpen(true);
      setFold(true);
    } else {
      handleCloseDetailPanel();
    }
  };

  const handleResizeStart = () => {
    if (!isDesktop) return;
    document.addEventListener("mousemove", handleResizing);
    document.addEventListener("mouseup", handleResizeEnd);
  };

  const handleResizing = (e: MouseEvent) => {
    const newWidth = window.innerWidth - e.clientX;
    const clamped = Math.min(Math.max(newWidth, 520), 780);
    setPanelWidth(clamped);
  };

  const handleResizeEnd = () => {
    document.removeEventListener("mousemove", handleResizing);
    document.removeEventListener("mouseup", handleResizeEnd);
  };

  return (
    <div className="flex h-dvh flex-col overflow-x-hidden bg-background-secondary p-4 tablet:px-[26px] tablet:py-[70px] desktop:px-[84px] desktop:py-[120px]">
      <div className="flex max-w-[1120px] flex-1 flex-col gap-5 tablet:gap-10 desktop:min-w-[780px] desktop:gap-7">
        <TeamHeader teamName="경영관리팀" isAdmin />

        <div className="flex flex-1 flex-col gap-[22px] tablet:gap-7 desktop:flex-row desktop:gap-6">
          <TaskGroupList
            taskList={taskList}
            selectedTaskId={selectedTask?.id ?? null}
            onSelectTask={selectTask}
          />

          <TaskListContent
            selectedDate={selectedDate}
            onSelectDate={setSelectedDate}
            selectedTask={selectedTask}
            onSelectTodo={selectTodo}
            selectedTodoId={selectedTodoId}
          />
        </div>
      </div>

      <AnimatePresence>
        {isPanelOpen && selectedTask && selectedTodoId && (
          <motion.div
            key="todo-detail-panel"
            initial={{ x: panelWidth }}
            animate={{
              x: 0,
              transition: { duration: 0.25, ease: "easeOut" },
            }}
            exit={{
              x: panelWidth,
              opacity: 0,
              transition: { duration: 0.2, ease: "easeIn" },
            }}
            className="fixed top-[52px] right-0 h-[calc(100dvh-52px)] bg-background-primary shadow-2xl tablet:top-0 tablet:h-full"
            style={{ width: isDesktop ? panelWidth : "100%" }}
          >
            {isDesktop && (
              <div
                className="absolute top-0 left-0 h-full w-1 cursor-col-resize bg-transparent hover:bg-border-primary/20"
                onMouseDown={handleResizeStart}
              />
            )}

            <TodoDetail
              taskId={selectedTask.id}
              todoId={selectedTodoId}
              close={handleCloseDetailPanel}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
