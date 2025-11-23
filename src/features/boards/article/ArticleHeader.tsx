import AvatarSM from "@/assets/images/avatar-placeholder-sm.svg";
import { Button } from "@/components/button";
import Dropdown from "@/components/dropdown";
import Icon from "@/components/icon";
import { Alert } from "@/components/modal";
import { Article } from "@/types/article";
import { formatDate } from "@/utils/format-date";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";

interface ArticleHeaderProps {
  article?: Article;
  currentUserId?: number;
  userImage?: string;
  deleteArticleMutation?: ReturnType<typeof useMutation<void, Error, number>>;
}

export default function ArticleHeader({
  userImage,
  currentUserId,
  article,
  deleteArticleMutation,
}: ArticleHeaderProps) {
  const router = useRouter();
  const { id } = router.query;

  const articleDropdownOptions = [
    {
      label: "수정하기",
      value: "edit",
      action: () => router.push(`/boards/edit/${id}`),
    },
    {
      label: "삭제하기",
      value: "delete",
      action: () => {
        alertDeleteArticle();
      },
    },
  ];

  const alertDeleteArticle = () => {
    overlay.open(
      ({ isOpen, close, unmount }) => (
        <Alert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title="게시글을 삭제하시겠어요?"
          message={`삭제된 게시글은 다시 복구할 수 없습니다.`}
          actions={[
            <Button
              key="alert-close"
              variant="outlinedSecondary"
              title="닫기"
              onClick={close}
            />,
            <Button
              key="alert-action"
              variant="danger"
              title="삭제"
              onClick={() => {
                handleDeleteArticle();
                close();
              }}
            />,
          ]}
        />
      ),
      { overlayId: "delete-article-alert" }
    );
  };

  const handleDeleteArticle = () => {
    deleteArticleMutation?.mutate(Number(id));
  };

  return (
    <div className="flex h-[68px] flex-col gap-2 border-b border-b-border-primary tablet:h-[76px]">
      <div className="flex justify-between">
        <div className="line-clamp-1 text-2lg-b tablet:text-xl-b">
          {article?.title}
        </div>
        {article?.writer.id === currentUserId && (
          <button className="cursor-pointer">
            <Dropdown
              anchor={<Icon name="dots" />}
              options={articleDropdownOptions}
              direction="bottom"
              alignment="right"
            />
          </button>
        )}
      </div>
      <div className="flex h-9 items-center gap-2">
        <div>
          {userImage ? (
            <Image src={userImage} alt="유저 이미지" width={24} height={24} />
          ) : (
            <AvatarSM className="h-6 w-6" />
          )}
        </div>
        <div>
          <span className="text-xs-m text-text-primary tablet:text-md-m">
            {article?.writer.nickname}
          </span>
          <div className="mx-2 inline-block h-3 -translate-y-[0.05rem] border-l border-slate-700 align-middle" />
          <span className="text-xs-m text-slate-400 tablet:text-md-m">
            {formatDate(article?.createdAt ?? "")}
          </span>
        </div>
      </div>
    </div>
  );
}
