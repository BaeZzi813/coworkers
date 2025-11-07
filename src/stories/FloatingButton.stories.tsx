import { FloatingButton as FloatingButtonComponent } from "@/components/button";
import type { Meta } from "@storybook/nextjs";

const meta = {
  title: "Components/FloatingButton",
  component: FloatingButtonComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof FloatingButtonComponent>;

export default meta;

export function FloatingButton() {
  return (
    <div className="flex items-center gap-4">
      <FloatingButtonComponent variant="primary" iconName="plus" />
      <FloatingButtonComponent variant="inverse" iconName="heart" />
    </div>
  );
}
