import { Button } from "@/components/button";
import Select, { SelectOption } from "@/components/select";
import { TaskGroup } from "@/types/task";
import TaskItem from "./TaskItem";

interface Props {
  isDesktop: boolean;
  taskList?: TaskGroup[];
  selectedTaskId: number | null;
  onSelectTask: (id: number) => void;
}

export default function TaskGroupList({
  isDesktop,
  taskList,
  selectedTaskId,
  onSelectTask,
}: Props) {
  const taskOptions: SelectOption[] =
    taskList?.map((task) => ({
      label: (
        <TaskItem title={task.name} tasks={task.tasks} onClick={() => {}} />
      ),
      value: String(task.id),
    })) ?? [];

  const selectedTaskOption =
    taskOptions.find((opt) => opt.value === String(selectedTaskId)) ??
    undefined;

  return (
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
                onClick={() => onSelectTask(task.id)}
              />
            ))}
          </div>
        ) : (
          <Select
            options={taskOptions}
            value={selectedTaskOption}
            onChange={(opt) => onSelectTask(Number(opt.value))}
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
  );
}
