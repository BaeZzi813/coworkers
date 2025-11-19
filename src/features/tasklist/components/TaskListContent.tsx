import { FloatingButton } from "@/components/button";
import Icon from "@/components/icon";
import { TaskGroup } from "@/types/task";
import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../apis/mock";
import DateSelector from "./DateSelector";
import TodoItem from "./TodoItem";

interface Props {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  selectedTask: TaskGroup | null;
}

export default function TaskListContent({
  selectedDate,
  onSelectDate,
  selectedTask,
}: Props) {
  const { data: todoList } = useQuery({
    queryKey: ["todo-list", selectedTask, selectedDate],
    queryFn: () => {
      if (!selectedTask) return Promise.resolve([]);
      return getTodoList(selectedTask.id, selectedDate);
    },
  });

  const hasTodo = todoList && todoList.length > 0;

  const handleTodoAdd = () => {
    console.log("Add TodoItem");
  };
  return (
    <section className="relative -mx-4 -mb-4 min-h-[768px] flex-1 bg-background-primary px-[18px] py-[38px] tablet:m-0 tablet:w-full tablet:rounded-3xl tablet:px-[30px] tablet:py-[46px] desktop:px-[42px] desktop:py-[46px]">
      <div className="relative">
        {selectedTask ? (
          <h2 className="absolute text-xl-b tablet:text-xl-b">
            {selectedTask?.name}
          </h2>
        ) : (
          <button
            aria-label="할 일 추가"
            onClick={handleTodoAdd}
            className="absolute z-10 cursor-pointer text-xl-s text-state-400"
          >
            할 일을 입력해주세요
          </button>
        )}
      </div>
      <DateSelector selectedDate={selectedDate} onSelect={onSelectDate} />

      <div className="tablet:12 mt-6 flex flex-col gap-3 desktop:mt-[38px]">
        {hasTodo ? (
          todoList?.map((todo) => (
            <TodoItem
              key={todo.id}
              title={todo.name}
              commentCount={todo.commentCount}
              createdAt={todo.date}
              frequency={todo.frequency}
              isDone={!!todo.doneAt}
            />
          ))
        ) : (
          <TodoItem
            title="할 일을 달성하기 위한 체크리스트를 입력해주세요"
            commentCount={0}
            createdAt={new Date().toISOString()}
            frequency="DAILY"
            isEmpty
            onItemClick={handleTodoAdd}
          />
        )}
      </div>

      <div className="fixed right-3.5 bottom-[30px] tablet:bottom-32 desktop:absolute desktop:top-[260px] desktop:-right-7">
        <FloatingButton
          icon={<Icon name="plus" color="white" />}
          onClick={handleTodoAdd}
        />
      </div>
    </section>
  );
}
