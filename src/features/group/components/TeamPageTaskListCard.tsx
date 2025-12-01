import DoneBadge from "@/components/badge/DoneBadge";
import Icon from "@/components/icon";
import { useTaskMutation } from "@/features/task/query";
import { isTaskDone } from "@/features/task/utils";
import TaskListEditDropdown from "@/features/tasklist/components/TaskListEditDropdown";
import { Task, TaskList } from "@/types/task";
import { isEmpty } from "@/utils/array-sugar";
import { useRouter } from "next/router";
import { Attributes, MouseEvent } from "react";
import { groupsQueryKey } from "../query/query-key";
import { useTeamContext } from "./TeamProvider";

interface Props extends Attributes {
  taskList: TaskList;
  done: boolean;
}

export default function TeamPageTaskListCard({ key, taskList, done }: Props) {
  const { group } = useTeamContext();
  const tasks = taskList.tasks;
  const doneTasks = tasks.filter(isTaskDone);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/${group.id}/tasklist?id=${taskList.id}`);
  };

  return (
    <div
      key={key}
      className="flex cursor-pointer flex-col gap-4 rounded-xl border border-border-primary bg-background-primary py-4 pr-4 pl-5"
      onClick={handleCardClick}
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
          <TaskListEditDropdown
            taskList={taskList}
            anchor={
              <Icon name="dots" size="large" color="var(--color-state-300)" />
            }
          />
        </div>
      </div>
      {done || isEmpty(tasks) || (
        <div className="flex flex-col gap-2">
          {taskList.tasks.map((task) => (
            <TaskCheckbox
              key={task.id}
              groupId={group.id}
              taskList={taskList}
              task={task}
            />
          ))}
        </div>
      )}
    </div>
  );
}

interface TaskCheckboxProps extends Attributes {
  groupId: number;
  taskList: TaskList;
  task: Task;
}

function TaskCheckbox({ key, groupId, taskList, task }: TaskCheckboxProps) {
  const { patchMutation } = useTaskMutation({
    groupId,
    taskListId: taskList.id,
  });

  const handleToggle = (event: MouseEvent) => {
    event.stopPropagation();
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
