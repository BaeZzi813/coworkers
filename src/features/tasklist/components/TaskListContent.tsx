import { FloatingButton } from "@/components/button";
import Icon from "@/components/icon";
import { useQuery } from "@tanstack/react-query";
import { getTodoList } from "../apis/mock";
import DateSelector from "./DateSelector";
import TodoItem from "./TodoItem";

interface Props {
  selectedDate: Date;
  onSelectDate: (d: Date) => void;
  defaultTaskId: number | null;
  defaultTaskName: string;
}

export default function TaskListContent({
  selectedDate,
  onSelectDate,
  defaultTaskId,
  defaultTaskName,
}: Props) {
  const { data: todoList } = useQuery({
    queryKey: ["todo-list", defaultTaskId, selectedDate],
    queryFn: () => {
      if (defaultTaskId === null) return Promise.resolve([]);
      return getTodoList(defaultTaskId, selectedDate);
    },
  });

  return (
    <section className="relative -mx-4 -mb-4 min-h-[768px] flex-1 bg-background-primary px-[18px] py-[38px] tablet:m-0 tablet:w-full tablet:rounded-3xl tablet:px-[30px] tablet:py-[46px] desktop:px-[42px] desktop:py-[46px]">
      <div className="relative">
        <h2 className="absolute inset-0 text-lg-b tablet:text-xl-b">
          {defaultTaskName}
        </h2>
      </div>
      <DateSelector selectedDate={selectedDate} onSelect={onSelectDate} />
      <div className="tablet:12 mt-6 flex flex-col gap-3 desktop:mt-[38px]">
        {todoList?.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.name}
            commentCount={todo.commentCount}
            createdAt={todo.date}
            frequency={todo.frequency}
            isDone={!!todo.doneAt}
          />
        ))}
      </div>
      <div className="fixed right-3.5 bottom-[30px] tablet:bottom-32 desktop:absolute desktop:top-[260px] desktop:-right-7">
        <FloatingButton icon={<Icon name="plus" color="white" />} />
      </div>
    </section>
  );
}
