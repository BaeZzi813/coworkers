import { Button as ButtonComponent } from "@/components/button";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Components/Button",
  component: ButtonComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof ButtonComponent>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Button: Story = {
  args: {
    title: "Button",
    size: "large",
    isFullWidth: false,
    rounded: false,
    disabled: false,
  },
  render: (args) => {
    return (
      <div className="flex w-xl flex-col items-center gap-4">
        <ButtonComponent variant="primary" {...args} />
        <ButtonComponent variant="outlined" {...args} />
        <ButtonComponent variant="danger" {...args} />
      </div>
    );
  },
};
