import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";

export default function ArticleLikeButton({
  likeCount,
}: {
  likeCount?: number;
}) {
  const { isDesktop, isMobile } = useResponsive();
  return (
    <>
      {isDesktop ? (
        <div className="h-10">
          <div className="absolute top-44 -right-20 flex flex-col items-center gap-2">
            <button className="flex h-16 w-16 cursor-pointer items-center justify-center rounded-full bg-background-inverse">
              <Icon name="heart" color="white" />
            </button>
            <span className="text-lg-r text-state-400">{likeCount}</span>
          </div>
        </div>
      ) : (
        <span className="flex h-[49px] items-center justify-end text-md-r text-slate-400 tablet:h-20 tablet:text-lg-r">
          <button className="mr-1 inline-block cursor-pointer">
            {isMobile ? (
              <Icon name="heart" size="small" color="white" />
            ) : (
              <Icon name="heart" size="large" color="white" />
            )}
          </button>
          {likeCount}
        </span>
      )}
    </>
  );
}
