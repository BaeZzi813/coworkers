import { Input as InputComponent } from "@/components/input";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof InputComponent> = {
  title: "Components/Input",
  component: InputComponent,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: { type: "radio" },
      options: ["pc", "mobile"],
    },
    type: {
      control: { type: "radio" },
      options: ["text", "password"],
    },
    placeholder: {
      control: { type: "text" },
    },
  },
  args: {
    placeholder: "이메일을 입력하세요.",
    size: "pc",
    type: "text",
  },
};

export default meta;

type Story = StoryObj<typeof InputComponent>;

export const PcInput: Story = {
  args: {
    size: "pc",
  },
};

export const MobileInput: Story = {
  args: {
    size: "mobile",
  },
};
