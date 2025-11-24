import DoneBadge from "@/components/badge/DoneBadge";
import EditDropdown from "@/components/dropdown/EditDropdown";
import Icon from "@/components/icon";
import { useTaskMutation } from "@/features/task/query";
import { isTaskDone } from "@/features/task/utils";
import { useResponsive } from "@/hooks/use-responsive";
import { Task, TaskList } from "@/types/task";
import { isEmpty } from "@/utils/array-sugar";
import { Attributes, useContext } from "react";
import { groupsQueryKey } from "../query/query-key";
import { TeamContext } from "./TeamProvider";

interface Props extends Attributes {
  taskList: TaskList;
  done: boolean;
}

export default function TeamPageTaskListCard({ key, taskList, done }: Props) {
  const { isDesktop } = useResponsive();
  const tasks = taskList.tasks;
  const doneTasks = tasks.filter(isTaskDone);

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
            <TaskCheckbox key={task.id} taskList={taskList} task={task} />
          ))}
        </div>
      )}
    </div>
  );
}

interface TaskCheckboxProps extends Attributes {
  taskList: TaskList;
  task: Task;
}

function TaskCheckbox({ key, taskList, task }: TaskCheckboxProps) {
  const groupId = useContext(TeamContext)!.group.id;
  const { patchMutation } = useTaskMutation({
    groupId,
    taskListId: taskList.id,
  });

  const handleToggle = () => {
    patchMutation.mutate(
      { taskId: task.id, done: !isTaskDone(task) },
      {
        onSuccess: (data, variables, onMutationResult, context) => {
          context.client.invalidateQueries({
            queryKey: groupsQueryKey({ groupId }),
          });
        },
      }
    );
  };

  return (
    <div key={key} className="flex items-center gap-2">
      <button className="shrink-0 cursor-pointer" onClick={handleToggle}>
        <Icon
          name={isTaskDone(task) ? "checkboxCheck" : "checkbox"}
          color={isTaskDone(task) ? undefined : "white"}
        />
      </button>
      <div className="grow text-xs-r">{task.name}</div>
    </div>
  );
}
