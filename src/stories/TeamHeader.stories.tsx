import TeamHeaderComponent from "@/features/tasklist/components/TeamHeader";
import type { Meta, StoryObj } from "@storybook/nextjs";

const meta = {
  title: "TeamHeader",
  component: TeamHeaderComponent,
  parameters: { layout: "centered" },
  argTypes: {
    teamName: { control: "text", description: "팀 이름" },
    isAdmin: { control: "boolean", description: "관리자 여부" },
  },
  args: {
    teamName: "경영관리팀",
    isAdmin: true,
    onEdit: () => console.log("팀 수정"),
    onDelete: () => console.log("팀 삭제"),
  },
} satisfies Meta<typeof TeamHeaderComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TeamHeader: Story = {
  render: (args) => (
    <div className="w-[1000px]">
      <TeamHeaderComponent {...args} />
    </div>
  ),
};
