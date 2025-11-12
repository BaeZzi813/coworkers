import { Button } from "@/components/button";
import { TextField as TextFieldComponent } from "@/components/input";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { useCallback, useState } from "react";

type TextFieldStoryProps = {
  type: "text" | "password";
  placeholder: string;
};

const meta = {
  title: "Components/TextField",
  component: TextFieldComponent,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: { type: "radio" },
      options: ["text", "password"],
    },
    placeholder: {
      control: { type: "text" },
    },
  },
  args: {
    type: "text",
    placeholder: "이메일을 입력하세요.",
  },
} satisfies Meta<TextFieldStoryProps>;

export default meta;

type Story = StoryObj<TextFieldStoryProps>;

export const TextField: Story = {
  render: (args) => <TextFieldWithValidation {...args} />,
};

function TextFieldWithValidation({ type, placeholder }: TextFieldStoryProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      setValue(event.target.value);
      setError(null);
    },
    []
  );

  const handleValidate = useCallback(() => {
    if (type === "text") {
      const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if (!emailRegex.test(value)) {
        setError("유효한 이메일이 아닙니다.");
        return;
      }
    }

    if (type === "password") {
      if (value.length < 8) {
        setError("8자리 이상 입력해주세요.");
        return;
      }
    }

    setError(null);
  }, [type, value]);

  return (
    <div className="flex w-xl flex-col items-center gap-4">
      <TextFieldComponent
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        errorMessage={error ?? undefined}
        showError={Boolean(error)}
        trailing={
          <Button
            title="테스트"
            size="small"
            isFullWidth={false}
            onClick={handleValidate}
          />
        }
        trailingPadding="pr-28"
      />
    </div>
  );
}
