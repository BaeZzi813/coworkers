import { Button } from "@/components/button";
import Select, { SelectOption } from "@/components/select";
import { useResponsive } from "@/hooks/use-responsive";
import { TaskList } from "@/types/task";
import { openTaskListCreateAlert } from "./TaskListCreateAlert";
import TaskListGroupItem from "./TaskListGroupItem";

interface Props {
  groupId: number;
  taskLists: TaskList[];
  selectedTaskListId: number;
  onSelect: (taskListId: number) => void;
}

export default function TaskListGroup({
  groupId,
  taskLists,
  selectedTaskListId,
  onSelect,
}: Props) {
  const hasTask = taskLists.length > 0;

  const handleClick = (taskListId?: number) => {
    if (taskListId) {
      onSelect(taskListId);
    } else {
      openTaskListCreateAlert({ groupId });
    }
  };

  return (
    <section className="flex w-full flex-col gap-2 tablet:gap-3 desktop:max-w-[270px] desktop:gap-6 desktop:py-3">
      <h2 className="text-lg-s text-text-default desktop:text-xl-b desktop:text-text-primary">
        할 일
      </h2>

      <div className="flex items-center justify-between gap-[38px] desktop:flex-col">
        <GroupItem
          hasTask={hasTask}
          taskLists={taskLists}
          selectedTaskListId={selectedTaskListId}
          onClick={handleClick}
        />

        <div className="rounded-full bg-background-primary">
          <Button
            title="할 일 추가"
            iconName="plus"
            variant="outlinedPrimary"
            isFullWidth={false}
            rounded
            onClick={() => handleClick()}
          />
        </div>
      </div>
    </section>
  );
}

function GroupItem({
  hasTask,
  taskLists,
  selectedTaskListId,
  onClick,
}: {
  hasTask: boolean;
  taskLists: TaskList[];
  selectedTaskListId?: number;
  onClick: (taskListId?: number) => void;
}) {
  const { isDesktop } = useResponsive();

  if (isDesktop) {
    return (
      <div className="flex w-full min-w-60 flex-col gap-1">
        {hasTask ? (
          taskLists.map((taskList) => (
            <TaskListGroupItem
              key={taskList.id}
              taskList={taskList}
              onClick={() => onClick(taskList.id)}
            />
          ))
        ) : (
          <TaskListGroupItem onClick={onClick} />
        )}
      </div>
    );
  }

  const mobileTaskOptions: SelectOption[] = taskLists.map((taskList) => ({
    label: <TaskListGroupItem key={taskList.id} taskList={taskList} />,
    value: String(taskList.id),
  }));

  const selectedOption = mobileTaskOptions.find(
    (opt) => opt.value === String(selectedTaskListId)
  );

  return hasTask ? (
    <Select
      options={mobileTaskOptions}
      value={selectedOption}
      onChange={(option) => onClick(Number(option.value))}
      className="h-11 w-[180px] tablet:w-60"
    />
  ) : (
    <div className="tablet:[240p]x flex h-11 w-[180px] cursor-pointer items-center rounded-lg border border-border-primary bg-background-primary p-2 tablet:w-60 tablet:rounded-xl tablet:px-3.5 tablet:py-2.5">
      <TaskListGroupItem onClick={onClick} />
    </div>
  );
}
