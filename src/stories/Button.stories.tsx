import { Button } from "@/components/button";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "Color",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Button",
    variant: "primary",
    size: "large",
    isFullWidth: false,
    rounded: false,
    disabled: false,
  },
};

export const Outlined: Story = {
  args: {
    title: "Button",
    variant: "outlined",
    size: "large",
    isFullWidth: false,
    rounded: false,
    disabled: false,
  },
};

export const Danger: Story = {
  args: {
    title: "Button",
    variant: "danger",
    size: "large",
    isFullWidth: false,
    rounded: false,
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    title: "Button",
    variant: "primary",
    size: "large",
    isFullWidth: false,
    rounded: false,
    disabled: true,
  },
};
