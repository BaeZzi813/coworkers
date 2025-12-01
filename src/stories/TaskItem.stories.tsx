import TaskItemComponent from "@/features/tasklist/components/TaskListGroupItem";
import type { Task } from "@/types/task";
import type { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/TaskItem",
  component: TaskItemComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof TaskItemComponent>;

export default meta;
type Story = StoryObj<typeof TaskItemComponent>;

const sampleTasks: Task[] = [
  {
    id: 1,
    name: "업무 A",
    description: "",
    commentCount: 0,
    writer: { id: 1, nickname: "홍길동", image: "" },
    doneBy: { user: { id: 1, nickname: "홍길동", image: "" } },
    displayIndex: 0,
    frequency: "DAILY",
    date: "2025-01-01T00:00:00.000Z",
    doneAt: "2025-01-01T00:00:00.000Z",
    deletedAt: null,
    recurringId: 0,
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
  {
    id: 2,
    name: "업무 B",
    description: "",
    commentCount: 0,
    writer: { id: 2, nickname: "이순신", image: "" },
    doneBy: null,
    displayIndex: 1,
    frequency: "DAILY",
    date: "2025-01-01T00:00:00.000Z",
    doneAt: null,
    deletedAt: null,
    recurringId: 0,
    updatedAt: "2025-01-01T00:00:00.000Z",
  },
];

export const TaskItem: Story = {
  args: {
    title: "법인 등기",
    tasks: sampleTasks,
    onClick: () => console.log("clicked"),
  },
};
