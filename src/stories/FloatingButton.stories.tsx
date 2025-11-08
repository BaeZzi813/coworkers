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
  const handleClick = () => {
    console.log("Floating button clicked");
  };

  return (
    <div className="flex items-center gap-4">
      <FloatingButtonComponent
        variant="primary"
        iconName="plus"
        onClick={handleClick}
      />
      <FloatingButtonComponent
        variant="inverse"
        iconName="heart"
        onClick={handleClick}
      />
    </div>
  );
}
