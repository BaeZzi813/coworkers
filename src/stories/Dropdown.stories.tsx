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
    <div className="flex gap-12">
      <div className="flex flex-col gap-4">
        <DropdownComponent
          anchor={<Button title="Top Left" isFullWidth={false} />}
          options={["Option 1", "Option 2", "Option 3"]}
          direction="top"
          alignment="left"
          onSelect={(option) => console.log(option)}
        />
        <DropdownComponent
          anchor={<Button title="Top Right" isFullWidth={false} />}
          options={[
            { value: "option-1", label: "Option 1" },
            { value: "option-2", label: "Option 2" },
            { value: "option-3", label: "Option 3" },
          ]}
          direction="top"
          alignment="right"
          onSelect={(option) => console.log(option)}
        />
        <DropdownComponent
          anchor={
            <Button title="Top fill with long anchor" isFullWidth={false} />
          }
          options={["Option 1", "Option 2", "Option 3"]}
          direction="top"
          alignment="fill"
          onSelect={(option) => console.log(option)}
        />
        <DropdownComponent
          anchor={<Button title="Top offset" isFullWidth={false} />}
          options={["Option 1", "Option 2", "Option 3"]}
          direction="top"
          alignment="right"
          alignmentOffset={-24}
          onSelect={(option) => console.log(option)}
        />
      </div>
      <div className="flex flex-col gap-4">
        <DropdownComponent
          anchor={<Button title="Bottom Left" isFullWidth={false} />}
          options={["Option 1", "Option 2", "Option 3"]}
          direction="bottom"
          alignment="left"
          onSelect={(option) => console.log(option)}
        />
        <DropdownComponent
          anchor={<Button title="Bottom Right" isFullWidth={false} />}
          options={[
            { value: "option-1", label: "Option 1" },
            { value: "option-2", label: "Option 2" },
            { value: "option-3", label: "Option 3" },
          ]}
          direction="bottom"
          alignment="right"
          onSelect={(option) => console.log(option)}
        />
        <DropdownComponent
          anchor={
            <Button title="Bottom fill with long anchor" isFullWidth={false} />
          }
          options={["Option 1", "Option 2", "Option 3"]}
          direction="bottom"
          alignment="fill"
          onSelect={(option) => console.log(option)}
        />
        <DropdownComponent
          anchor={<Button title="Bottom offset" isFullWidth={false} />}
          options={["Option 1", "Option 2", "Option 3"]}
          direction="bottom"
          alignment="right"
          alignmentOffset={-24}
          onSelect={(option) => console.log(option)}
        />
      </div>
    </div>
  );
}
