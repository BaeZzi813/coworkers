import CommentItem from "@/features/comment/components/CommentItem";

export default function CommentItemTestPage() {
  const dummyComment = {
    id: 1,
    user: {
      id: 5,
      nickname: "권민영",
      image: "",
    },
    userId: 5,
    taskId: 12,
    content: "법인 등기 관련 일정은 내일까지 정리할게요!",
    createdAt: "2025-11-12T22:24:10.726Z",
    updatedAt: "2025-11-12T22:24:10.726Z",
  };

  const dummyBoardComment = {
    id: 2,
    writer: {
      id: 7,
      nickname: "박지은",
      image: "",
    },
    content: "회의 일정을 내일 오전으로 변경했습니다.",
    createdAt: "2025-11-13T01:10:10.000Z",
    updatedAt: "2025-11-13T01:10:10.000Z",
  };

  return (
    <main className="mx-auto max-w-[800px] px-20 py-40">
      <h1 className="text-20-bold mb-24 text-gray-900">CommentItem Test</h1>

      <div className="flex flex-col gap-24">
        {/* 댓글 API 기반 */}
        <CommentItem {...dummyComment} />

        {/* 게시판 API 기반 */}
        <CommentItem {...dummyBoardComment} />

        {/* 다른 유저 (isMine = false) */}
        <CommentItem {...dummyComment} userId={99} />
      </div>
    </main>
  );
}
