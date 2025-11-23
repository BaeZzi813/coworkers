import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";

export default function ArticleLikeButton({
  likeCount,
  isLiked,
  onToggle,
}: {
  likeCount?: number;
  isLiked: boolean;
  onToggle: () => void;
}) {
  const { isDesktop, isMobile } = useResponsive();

  return (
    <>
      {isDesktop ? (
        <div className="h-10">
          <div className="absolute top-44 -right-20 flex flex-col items-center gap-2">
            <button
              onClick={onToggle}
              className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-background-inverse"
            >
              <Icon name={isLiked ? "heartFill" : "heart"} color="white" />
            </button>
            <span className="text-lg-r text-state-400">{likeCount}</span>
          </div>
        </div>
      ) : (
        <span className="flex h-[49px] items-center justify-end text-md-r text-slate-400 tablet:h-20 tablet:text-lg-r">
          <button
            onClick={onToggle}
            className="mr-1 inline-block cursor-pointer"
          >
            {isMobile ? (
              <Icon
                name={isLiked ? "heartFill" : "heart"}
                size="small"
                color="white"
              />
            ) : (
              <Icon
                name={isLiked ? "heartFill" : "heart"}
                size="large"
                color="white"
              />
            )}
          </button>
          {likeCount}
        </span>
      )}
    </>
  );
}
