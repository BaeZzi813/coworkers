import { Button } from "@/components/button";
import Select, { SelectOption } from "@/components/select";
import { useResponsive } from "@/hooks/use-responsive";
import { TaskList } from "@/types/task";
import { overlay } from "overlay-kit";
import DeleteModal from "./DeleteModal";
import TaskItem from "./TaskItem";
import TaskModal from "./TaskModal";

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

  const handlePostTask = async (name: string) => {
    console.log(`Add TaskItem ${name}`);
  };
  const handlePatchTask = async (id: number, name: string) => {
    console.log(`Edit TaskItem ${id}: ${name}`);
  };
  const handleDeleteTaskList = async (id: number) => {
    console.log("DELETE TASK LIST:", id);
  };

  const openTaskModal = ({
    mode,
    taskId,
    defaultValue,
  }: {
    mode: "create" | "edit";
    taskId?: number;
    defaultValue?: string;
  }) => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <TaskModal
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title={mode === "create" ? "할 일 목록 생성" : "할 일 목록 수정"}
          defaultValue={defaultValue}
          confirmLabel={mode === "create" ? "만들기" : "수정하기"}
          onSubmit={(name) =>
            mode === "create"
              ? handlePostTask(name)
              : handlePatchTask(taskId!, name)
          }
        />
      ),
      { overlayId: `todo-list-${mode}` }
    );
  };
  const openDeleteModal = ({
    taskId,
    targetName,
  }: {
    taskId: number;
    targetName: string;
  }) => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <DeleteModal
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          type="taskList"
          targetName={targetName}
          onDelete={() => handleDeleteTaskList(taskId)}
        />
      ),
      { overlayId: "taskList-delete" }
    );
  };

  const mobileTaskOptions: SelectOption[] = taskList.map((task) => ({
    label: (
      <TaskItem
        key={task.id}
        title={task.name}
        tasks={task.tasks}
        onEdit={() =>
          openTaskModal({
            mode: "edit",
            taskId: task.id,
            defaultValue: task.name,
          })
        }
        onDelete={() =>
          openDeleteModal({ taskId: task.id, targetName: task.name })
        }
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
      <TaskItem
        title="제목 없음"
        tasks={[]}
        onClick={() => openTaskModal({ mode: "create" })}
      />
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
            onEdit={() =>
              openTaskModal({
                mode: "edit",
                taskId: task.id,
                defaultValue: task.name,
              })
            }
            onDelete={() =>
              openDeleteModal({ taskId: task.id, targetName: task.name })
            }
          />
        ))
      ) : (
        <TaskItem
          title="제목 없음"
          tasks={[]}
          onClick={() => openTaskModal({ mode: "create" })}
        />
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
            onClick={() => openTaskModal({ mode: "create" })}
          />
        </div>
      </div>
    </section>
  );
}
