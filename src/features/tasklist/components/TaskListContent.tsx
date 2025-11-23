import { FloatingButton } from "@/components/button";
import Icon from "@/components/icon";
import { TaskList } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../apis/mock";
import { useToggleTodo } from "../hooks/useToggleTodo";
import DateSelector from "./DateSelector";
import TodoItem from "./TodoItem";

interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  selectedTask: TaskList | null;
  selectedTodoId: number | null;
  onSelectTodo: (todoId: number) => void;
}

export default function TaskListContent({
  selectedDate,
  onSelectDate,
  selectedTask,
  selectedTodoId,
  onSelectTodo,
}: Props) {
  const toggleTodo = useToggleTodo();

  const taskId = selectedTask?.id ?? null;
  const { data: todoList = [] } = useQuery({
    queryKey: ["todo-list", taskId, selectedDate.toISOString()],
    queryFn: () => getTodoList(taskId!, selectedDate),
    enabled: taskId !== null,
  });

  const hasTodo = todoList.length > 0;

  return (
    <section className="relative min-h-full flex-1 rounded-3xl bg-background-primary p-6">
      <div className="relative">
        {selectedTask ? (
          <h2 className="text-xl-b">{selectedTask.name}</h2>
        ) : (
          <button className="text-state-400">할 일을 입력해주세요</button>
        )}
      </div>

      <DateSelector selectedDate={selectedDate} onSelect={onSelectDate} />

      <div className="mt-6 flex flex-col gap-3">
        {hasTodo ? (
          todoList.map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.name}
              commentCount={todo.commentCount}
              createdAt={todo.date}
              frequency={todo.frequency}
              isSelected={selectedTodoId === todo.id}
              isDone={!!todo.doneAt}
              onItemClick={() => onSelectTodo(todo.id)}
              onToggleDone={() => {
                if (!taskId) return;
                toggleTodo.mutate({
                  taskId,
                  todoId: todo.id,
                  done: !todo.doneAt,
                });
              }}
            />
          ))
        ) : (
          <TodoItem
            title="할 일을 달성하기 위한 체크리스트를 입력해주세요"
            commentCount={0}
            createdAt={new Date().toISOString()}
            frequency="DAILY"
            isEmpty
          />
        )}
      </div>

      <div className="fixed right-4 bottom-10 desktop:absolute desktop:top-[260px] desktop:-right-7">
        <FloatingButton icon={<Icon name="plus" color="white" />} />
      </div>
    </section>
  );
}
