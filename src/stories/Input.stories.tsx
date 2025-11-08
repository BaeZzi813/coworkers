import { Input as InputComponent } from "@/components/input";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/Input",
  component: InputComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["pc", "mobile", "modal"],
    },
    type: {
      control: { type: "radio" },
      options: ["text", "password"],
    },
    placeholder: {
      control: { type: "text" },
    },
    variant: {
      control: { type: "radio" },
      options: ["default", "password", "passwordChange"],
    },
  },
  args: {
    placeholder: "이메일을 입력하세요.",
    size: "pc",
    type: "text",
    variant: "default",
  },
} satisfies Meta<typeof InputComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Input: Story = {
  args: {
    size: "pc",
  },
  render: (args) => (
    <div className="flex w-xl flex-col items-center gap-4">
      <InputComponent {...args} />
    </div>
  ),
};
