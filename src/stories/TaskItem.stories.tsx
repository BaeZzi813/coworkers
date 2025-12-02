import taskLists from "@/features/tasklist/apis/mock/task-list.json";
import TaskItemComponent from "@/features/tasklist/components/TaskListGroupItem";
import type { TaskList } from "@/types/task";
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

export const TaskItem: Story = {
  args: {
    taskList: taskLists[0] as TaskList,
    onClick: () => console.log("clicked"),
  },
};
