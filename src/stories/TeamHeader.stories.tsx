import TeamHeaderComponent from "@/features/tasklist/components/TeamHeader";
import { Group } from "@/types/group";
import type { Meta, StoryObj } from "@storybook/nextjs";

const groupMock: Group = {
  id: 3348,
  name: "경영관리팀",
  image:
    "https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Coworkers/user/2358/icons8-idea-256.png",
  createdAt: "2025-11-15T13:35:29+09:00",
  updatedAt: "2025-11-27T22:34:37+09:00",
  teamId: "18-3",
  members: [
    {
      userId: 2358,
      groupId: 3348,
      userName: "tester01",
      userEmail: "tester@example.com",
      userImage: "",
      role: "ADMIN",
    },
    {
      userId: 2451,
      groupId: 3348,
      userName: "배찌",
      userEmail: "baezzi@tester.com",
      userImage: "",
      role: "MEMBER",
    },
  ],
  taskLists: [
    {
      id: 4750,
      name: "법인 등기 1234",
      createdAt: "2025-11-18T17:00:48+09:00",
      updatedAt: "2025-11-26T16:57:34+09:00",
      groupId: 3348,
      displayIndex: 0,
      tasks: [
        {
          id: 27907,
          name: "법인 설립 혹은 변경 등기 비용 안내 드리기",
          description:
            "필수 정보 10분 입력하면 3일 안에 법인 설립이 완료되는 법인 설립 서비스의 장점에 대해 상세하게 설명드리기",
          date: "2025-11-30T09:00:00+09:00",
          doneAt: "2025-11-30T09:42:23+09:00",
          updatedAt: "2025-11-30T18:15:53+09:00",
          recurringId: 6763,
          deletedAt: null,
          displayIndex: 1,
          writer: {
            id: 2358,
            nickname: "tester01",
            image: null,
          },
          doneBy: {
            user: {
              id: 2358,
              nickname: "tester01",
              image: null,
            },
          },
          commentCount: 0,
          frequency: "DAILY",
        },
      ],
    },
    {
      id: 4752,
      name: "정기 주총gg",
      createdAt: "2025-11-18T18:22:36+09:00",
      updatedAt: "2025-11-26T14:20:04+09:00",
      groupId: 3348,
      displayIndex: 0,
      tasks: [
        {
          id: 27908,
          name: "법인 설립 안내 드리기",
          description: "법인 설립 안내 드리는 일입니다.",
          date: "2025-11-30T09:00:00+09:00",
          doneAt: "2025-11-30T09:42:57+09:00",
          updatedAt: "2025-11-30T18:15:53+09:00",
          recurringId: 6907,
          deletedAt: null,
          displayIndex: 0,
          writer: {
            id: 2358,
            nickname: "tester01",
            image: null,
          },
          doneBy: {
            user: {
              id: 2358,
              nickname: "tester01",
              image: null,
            },
          },
          commentCount: 0,
          frequency: "DAILY",
        },
      ],
    },
    {
      id: 4829,
      name: "법인 설립",
      createdAt: "2025-11-25T13:07:49+09:00",
      updatedAt: "2025-11-25T14:17:17+09:00",
      groupId: 3348,
      displayIndex: 3,
      tasks: [],
    },
  ],
};

const meta = {
  title: "TeamHeader",
  component: TeamHeaderComponent,
  parameters: { layout: "centered" },
  argTypes: {
    group: { control: "text", description: "팀 이름" },
    isAdmin: { control: "boolean", description: "관리자 여부" },
  },
  args: {
    group: groupMock,
    isAdmin: true,
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
