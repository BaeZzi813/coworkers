import DoneBadge from "@/components/badge/DoneBadge";
import EditDropdown from "@/components/dropdown/EditDropdown";
import Icon from "@/components/icon";
import { isTaskDone } from "@/features/task/utils";
import { useResponsive } from "@/hooks/use-responsive";
import { Task, TaskList } from "@/types/task";
import { isEmpty } from "@/utils/array-sugar";
import { Attributes } from "react";

export default function TeamPageTaskListCard({
  key,
  taskList,
  done,
}: {
  taskList: TaskList;
  done: boolean;
} & Attributes) {
  const { isDesktop } = useResponsive();
  const tasks = taskList.tasks;
  const doneTasks = tasks.filter(isTaskDone);

  const handleTaskToggle = (task: Task) => {
    // TODO: Toggle done
    console.log("Toggle done for task:", task);
  };

  const handleEditClick = () => {
    // TODO: Edit task list
    console.log("Edit task list:", taskList);
  };

  const handleDeleteClick = () => {
    // TODO: Delete task list
    console.log("Delete task list:", taskList);
  };

  return (
    <div
      key={key}
      className="flex flex-col gap-4 rounded-xl border border-border-primary bg-background-primary py-4 pr-4 pl-5"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg-s text-text-primary">{taskList.name}</h3>
        <div className="flex items-center">
          {tasks.length > 0 && (
            <DoneBadge
              current={doneTasks.length}
              total={tasks.length}
              size="small"
            />
          )}
          <EditDropdown
            anchor={
              <Icon name="dots" size="large" color="var(--color-state-300)" />
            }
            gap={10}
            direction={isDesktop ? undefined : "left"}
            alignment={isDesktop ? "left" : "bottom"}
            alignmentOffset={-6}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
          />
        </div>
      </div>
      {done || isEmpty(tasks) || (
        <div className="flex flex-col gap-2">
          {taskList.tasks.map((task) => (
            <TaskCheckbox
              key={task.id}
              task={task}
              onToggle={() => handleTaskToggle(task)}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TaskCheckbox({
  key,
  task,
  onToggle,
}: { task: Task; onToggle: () => void } & Attributes) {
  return (
    <div key={key} className="flex items-center gap-2">
      <button className="shrink-0 cursor-pointer" onClick={onToggle}>
        <Icon
          name={isTaskDone(task) ? "checkboxCheck" : "checkbox"}
          color={isTaskDone(task) ? undefined : "white"}
        />
      </button>
      <div className="grow text-xs-r">{task.name}</div>
    </div>
  );
}
