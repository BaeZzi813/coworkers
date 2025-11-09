import { Button } from "@/components/button";
import DropdownComponent from "@/components/dropdown";
import { Meta } from "@storybook/nextjs";

const meta = {
  title: "Components/Dropdown",
  component: DropdownComponent,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof DropdownComponent>;

export default meta;

export function Dropdown() {
  const button = <Button title="Open" isFullWidth={false} />;
  return (
    <DropdownComponent
      anchor={button}
      options={["Option 1", "Option 2", "Option 3"]}
      onSelect={(option) => console.log(option)}
    />
  );
}
