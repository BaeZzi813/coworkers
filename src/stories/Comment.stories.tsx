import { CommentItem, CommentPost } from "@/features/comment/components";
import { CommentItemProps } from "@/features/comment/components/CommentItem";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof CommentItem> = {
  title: "Components/Comment",
  component: CommentItem,
};

export default meta;

type Story = StoryObj<typeof CommentItem>;

const baseProps: CommentItemProps = {
  id: 1,
  content: "댓글 내용입니다.",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  user: {
    id: 1,
    nickname: "홍길동",
    image: "",
  },
  userId: 1,
  px: 20,
};

export const Default: Story = {
  args: {
    ...baseProps,
    userId: 2,
  },
};

export const Mine: Story = {
  args: {
    ...baseProps,
    userId: 5, // CommentItem 내부 임시 currentUserId와 동일하게 설정
  },
};

export const Post: StoryObj<typeof CommentPost> = {
  render: () => (
    <div className="w-[600px]">
      <CommentPost
        px={20}
        profileImage=""
        onSubmit={(text) => alert("제출됨: " + text)}
      />
    </div>
  ),
};
