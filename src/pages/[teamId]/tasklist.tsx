import { Button, FloatingButton } from "@/components/button";
import Icon from "@/components/icon";
import Select, { SelectOption } from "@/components/select";
import { getTaskList, getTodoList } from "@/features/tasklist/apis/mock";
import DateSelector from "@/features/tasklist/components/DateSelector";
import TaskItem from "@/features/tasklist/components/TaskItem";
import TeamHeader from "@/features/tasklist/components/TeamHeader";
import TodoItem from "@/features/tasklist/components/TodoItem";
import { useResponsive } from "@/hooks/use-responsive";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function TaskListPage() {
  const { isDesktop } = useResponsive();

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  // tasklist
  const { data: taskList, isPending: isTaskPending } = useQuery({
    queryKey: ["task-list"],
    queryFn: getTaskList,
  });
  const defaultTaskId =
    selectedTaskId ?? (taskList && taskList.length > 0 ? taskList[0].id : null);

  // todolist
  const { data: todoList, isPending: isTodoPending } = useQuery({
    queryKey: ["todo-list", defaultTaskId, selectedDate],
    queryFn: () => {
      if (defaultTaskId === null) return Promise.resolve([]);
      return getTodoList(defaultTaskId, selectedDate);
    },
  });

  const handleSelectTask = (id: number) => {
    setSelectedTaskId(id);
  };

  const taskOptions: SelectOption[] =
    taskList?.map((task) => ({
      label: (
        <TaskItem title={task.name} tasks={task.tasks} onClick={() => {}} />
      ),
      value: String(task.id),
    })) ?? [];
  const selectedTaskOption =
    taskOptions.find((opt) => opt.value === String(defaultTaskId)) ?? null;

  return (
    <div className="flex h-dvh flex-col overflow-x-hidden bg-background-secondary p-4 tablet:px-[26px] tablet:py-[70px] desktop:px-[84px] desktop:py-[120px]">
      <div className="flex max-w-[1120px] flex-1 flex-col gap-5 tablet:gap-10 desktop:gap-7">
        {/* section 1 */}
        <TeamHeader teamName="경영관리팀" isAdmin />

        <div className="flex flex-1 flex-col gap-[22px] tablet:gap-7 desktop:flex-row desktop:gap-6">
          {/* section 2 */}
          <section className="flex w-full flex-col gap-2 tablet:gap-3 desktop:max-w-[270px] desktop:gap-6 desktop:py-3">
            <h2 className="text-lg-s text-text-default desktop:text-xl-b desktop:text-text-primary">
              할 일
            </h2>
            <div className="flex items-center justify-between gap-[38px] desktop:flex-col">
              {isDesktop ? (
                <div className="flex w-full min-w-60 flex-col gap-1">
                  {taskList?.map((task) => (
                    <TaskItem
                      key={task.id}
                      title={task.name}
                      tasks={task.tasks}
                      onClick={() => handleSelectTask(task.id)}
                    />
                  ))}
                </div>
              ) : (
                <Select
                  options={taskOptions}
                  value={selectedTaskOption ?? undefined}
                  onChange={(opt) => setSelectedTaskId(Number(opt.value))}
                  className="h-11 w-[180px] tablet:w-60"
                />
              )}
              <div className="rounded-full bg-background-primary">
                <Button
                  title="할 일 추가"
                  iconName="plus"
                  variant="outlinedPrimary"
                  isFullWidth={false}
                  rounded
                />
              </div>
            </div>
          </section>

          {/* section 3 */}
          <section className="relative -mx-4 -mb-4 min-h-[768px] flex-1 bg-background-primary px-[18px] py-[38px] tablet:m-0 tablet:w-full tablet:rounded-3xl tablet:px-[30px] tablet:py-[46px] desktop:px-[42px] desktop:py-[46px]">
            <div className="relative">
              <h2 className="absolute inset-0 text-lg-b tablet:text-xl-b">
                {defaultTaskId}
              </h2>
            </div>
            <DateSelector
              selectedDate={selectedDate}
              onSelect={setSelectedDate}
            />

            {/* todolist */}
            <div className="tablet:12 mt-6 flex flex-col gap-3 desktop:mt-[38px]">
              {todoList?.map((todo) => (
                <TodoItem
                  key={todo.id}
                  title={todo.name}
                  commentCount={todo.commentCount}
                  createdAt={todo.date}
                  frequency={todo.frequency}
                  isDone={!!todo.doneAt}
                />
              ))}
            </div>

            {/* floating button */}
            <div className="fixed right-3.5 bottom-[30px] tablet:bottom-32 desktop:absolute desktop:top-[260px] desktop:-right-7">
              <FloatingButton icon={<Icon name="plus" color="white" />} />
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
