import { FloatingButton } from "@/components/button";
import Icon from "@/components/icon";
import TasksListItem from "@/features/task/components/TasksListItem";
import { useTasksQuery } from "@/features/task/query";
import { Task, TaskList } from "@/types/task";
import DateSelector from "../../tasklist/components/DateSelector";
import { useToggleTodo } from "../../tasklist/hooks/useToggleTodo";

interface Props {
  selectedDate: Date;
  selectedTaskList?: TaskList;
  selectedTaskId?: number;
  onDateSelect: (date: Date) => void;
  onSelect: (task: Task) => void;
}

export default function TasksListContent({
  selectedDate,
  selectedTaskList,
  selectedTaskId,
  onDateSelect,
  onSelect,
}: Props) {
  const toggleTodo = useToggleTodo();
  const groupId = selectedTaskList?.groupId;
  const taskListId = selectedTaskList?.id;

  const { tasks, isFetching } = useTasksQuery({
    groupId: groupId ?? 0,
    taskListId: taskListId ?? 0,
    date: selectedDate.toISOString(),
    enabled: !!taskListId,
  });

  const handleTaskCheckboxClick = (task: Task) => {
    if (!taskListId) return;
    toggleTodo.mutate({
      taskId: taskListId,
      todoId: task.id,
      done: !task.doneAt,
    });
  };

  return (
    <section className="relative min-h-full flex-1 rounded-3xl bg-background-primary p-6">
      <div className="relative">
        {selectedTaskList ? (
          <h2 className="text-xl-b">{selectedTaskList.name}</h2>
        ) : (
          <button className="text-state-400">할 일을 입력해주세요</button>
        )}
      </div>

      <DateSelector selectedDate={selectedDate} onSelect={onDateSelect} />

      {isFetching ? (
        <div>Loading...</div>
      ) : (
        <TasksList
          tasks={tasks || []}
          selectedTaskId={selectedTaskId}
          onSelect={onSelect}
          onCheckboxClick={handleTaskCheckboxClick}
        />
      )}

      <div className="fixed right-4 bottom-10 desktop:absolute desktop:top-[260px] desktop:-right-7">
        <FloatingButton icon={<Icon name="plus" color="white" />} />
      </div>
    </section>
  );
}

function TasksList({
  tasks,
  selectedTaskId,
  onSelect,
  onCheckboxClick,
}: {
  tasks: Task[];
  selectedTaskId?: number;
  onSelect: (task: Task) => void;
  onCheckboxClick: (task: Task) => void;
}) {
  const handleEditTask = () => {
    console.log("edit task");
  };
  const handleDeleteTask = () => {
    console.log("delete task");
  };

  return (
    <div className="mt-6 flex flex-col gap-3">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <TasksListItem
            key={task.id}
            title={task.name}
            commentCount={task.commentCount}
            createdAt={task.date}
            frequency={task.frequency}
            isSelected={!!selectedTaskId}
            isDone={!!task.doneAt}
            onClick={() => onSelect(task)}
            onCheckboxClick={() => onCheckboxClick(task)}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))
      ) : (
        <TasksListItem
          title="할 일을 달성하기 위한 체크리스트를 입력해주세요"
          commentCount={0}
          createdAt={new Date().toISOString()}
          frequency="DAILY"
          isEmpty
        />
      )}
    </div>
  );
}
