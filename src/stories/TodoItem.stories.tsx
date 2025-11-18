import TodoItemComponent from "@/features/tasklist/components/TodoItem";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof TodoItemComponent> = {
  title: "Components/TodoItemComponent",
  component: TodoItemComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    isSelected: {
      control: "boolean",
      description: "아이템 선택 상태",
    },
    isDone: {
      control: "boolean",
      description: "할일 완료 여부",
    },
  },
};

export default meta;

type Story = StoryObj<typeof TodoItemComponent>;

export const TodoItem: Story = {
  args: {
    title: "법인 설립 비용 안내 드리기",
    commentCount: 3,
    createdAt: "2024년 7월 29일",
    frequency: "DAILY",
    isSelected: false,
    isDone: false,
  },
  render: (args) => (
    <div className="w-[400px]">
      <TodoItemComponent {...args} />
    </div>
  ),
};
