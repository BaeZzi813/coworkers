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
  return (
    <div className="flex flex-col gap-4">
      <DropdownComponent
        anchor={<Button title="Align Left" isFullWidth={false} />}
        options={["Option 1", "Option 2", "Option 3"]}
        onSelect={(option) => console.log(option)}
      />
      <DropdownComponent
        anchor={<Button title="Align Right" isFullWidth={false} />}
        options={[
          { value: "option-1", label: "Option 1" },
          { value: "option-2", label: "Option 2" },
          { value: "option-3", label: "Option 3" },
        ]}
        alignment="right"
        onSelect={(option) => console.log(option)}
      />
      <DropdownComponent
        anchor={
          <Button title="Align fill with long anchor" isFullWidth={false} />
        }
        options={["Option 1", "Option 2", "Option 3"]}
        alignment="fill"
        onSelect={(option) => console.log(option)}
      />
      <DropdownComponent
        anchor={<Button title="Align offset" isFullWidth={false} />}
        options={["Option 1", "Option 2", "Option 3"]}
        alignment="right"
        alignmentOffset={-24}
        onSelect={(option) => console.log(option)}
      />
    </div>
  );
}
