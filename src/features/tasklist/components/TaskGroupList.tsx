import { Button } from "@/components/button";
import Select, { SelectOption } from "@/components/select";
import { useResponsive } from "@/hooks/use-responsive";
import { TaskList } from "@/types/task";
import TaskItem from "./TaskItem";

interface Props {
  taskList: TaskList[];
  selectedTaskId: number | null;
  onSelectTask: (id: number) => void;
}

export default function TaskGroupList({
  taskList,
  selectedTaskId,
  onSelectTask,
}: Props) {
  const { isDesktop } = useResponsive();
  const hasTask = taskList.length > 0;

  const handleAddTaskClick = () => {
    console.log("Add TaskItem");
  };

  const mobileTaskOptions: SelectOption[] = taskList.map((task) => ({
    label: (
      <TaskItem
        key={task.id}
        title={task.name}
        tasks={task.tasks}
        onClick={() => {}}
      />
    ),
    value: String(task.id),
  }));
  const selectedOption = mobileTaskOptions.find(
    (opt) => opt.value === String(selectedTaskId)
  );

  const mobileTaskSelect = hasTask ? (
    <Select
      options={mobileTaskOptions}
      value={selectedOption}
      onChange={(opt) => onSelectTask(Number(opt.value))}
      className="h-11 w-[180px] tablet:w-60"
    />
  ) : (
    <div className="tablet:[240p]x flex h-11 w-[180px] cursor-pointer items-center rounded-lg border border-border-primary bg-background-primary p-2 tablet:w-60 tablet:rounded-xl tablet:px-3.5 tablet:py-2.5">
      <TaskItem title="제목 없음" tasks={[]} onClick={handleAddTaskClick} />
    </div>
  );

  const desktopTaskList = (
    <div className="flex w-full min-w-60 flex-col gap-1">
      {hasTask ? (
        taskList.map((task) => (
          <TaskItem
            key={task.id}
            title={task.name}
            tasks={task.tasks}
            onClick={() => onSelectTask(task.id)}
          />
        ))
      ) : (
        <TaskItem title="제목 없음" tasks={[]} onClick={handleAddTaskClick} />
      )}
    </div>
  );

  return (
    <section className="flex w-full flex-col gap-2 tablet:gap-3 desktop:max-w-[270px] desktop:gap-6 desktop:py-3">
      <h2 className="text-lg-s text-text-default desktop:text-xl-b desktop:text-text-primary">
        할 일
      </h2>

      <div className="flex items-center justify-between gap-[38px] desktop:flex-col">
        {isDesktop ? desktopTaskList : mobileTaskSelect}

        <div className="rounded-full bg-background-primary">
          <Button
            title="할 일 추가"
            iconName="plus"
            variant="outlinedPrimary"
            isFullWidth={false}
            rounded
            onClick={handleAddTaskClick}
          />
        </div>
      </div>
    </section>
  );
}
