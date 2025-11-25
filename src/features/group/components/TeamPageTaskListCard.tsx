import DoneBadge from "@/components/badge/DoneBadge";
import EditDropdown from "@/components/dropdown/EditDropdown";
import Icon from "@/components/icon";
import { DeleteAlert, InputAlert } from "@/components/modal";
import { useTaskMutation } from "@/features/task/query";
import { isTaskDone } from "@/features/task/utils";
import { useTaskListMutation } from "@/features/tasklist/query";
import { useResponsive } from "@/hooks/use-responsive";
import { Task, TaskList } from "@/types/task";
import { isEmpty } from "@/utils/array-sugar";
import { overlay } from "overlay-kit";
import { Attributes, useContext } from "react";
import { groupsQueryKey } from "../query/query-key";
import { TeamContext } from "./TeamProvider";

interface Props extends Attributes {
  taskList: TaskList;
  done: boolean;
}

export default function TeamPageTaskListCard({ key, taskList, done }: Props) {
  const groupId = useContext(TeamContext)!.group.id;
  const { isDesktop } = useResponsive();
  const tasks = taskList.tasks;
  const doneTasks = tasks.filter(isTaskDone);
  const { deleteMutation, patchMutation } = useTaskListMutation();

  const handleEditClick = () => {
    const handleSubmit = (newName: string) => {
      patchMutation.mutate(
        { groupId, taskListId: taskList.id, name: newName },
        {
          onSuccess: (data, variables, onMutationResult, context) => {
            context.client.invalidateQueries({
              queryKey: groupsQueryKey({ groupId }),
            });
          },
        }
      );
    };

    return overlay.open(({ isOpen, close, unmount }) => (
      <InputAlert
        isOpen={isOpen}
        onClose={close}
        onExit={unmount}
        title="할 일 목록 수정"
        value={taskList.name}
        placeholder="목록 명을 입력해주세요."
        submitTitle="수정하기"
        onSubmit={handleSubmit}
      />
    ));
  };

  const handleDeleteClick = () => {
    overlay.open(({ isOpen, close, unmount }) => {
      const title = `'${taskList.name}'\n할 일을 정말 삭제하시겠어요?`;
      const handleDelete = () => {
        deleteMutation.mutate(
          { groupId, taskListId: taskList.id },
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
        <DeleteAlert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title={title}
          message="삭제 후에는 되돌릴 수 없습니다."
          onDelete={handleDelete}
        />
      );
    });
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
