import TeamEmptyImageLarge from "@/assets/images/team-empty-large.svg";
import TeamEmptyImageMedium from "@/assets/images/team-empty-medium.svg";
import TeamEmptyImageSmall from "@/assets/images/team-empty-small.svg";
import { Button } from "@/components/button";
import { prefetchUserGroups, useUserGroupsQuery } from "@/features/group/query";
import { useResponsive } from "@/hooks/use-responsive";
import { gsspPropsWithTokenReturn } from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { UserGroup } from "@/types/group";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

/**
 * SSR 환경에서 API 호출을 위해 access token을 사용하는 예시 코드
 */

interface DashboardPageData {
  groups: UserGroup[];
}

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const queryClient = new QueryClient();
  await prefetchUserGroups(queryClient, { accessToken });
  return gsspPropsWithTokenReturn({
    accessToken,
    dehydratedState: dehydrate(queryClient),
  });
});

export default serverSideComponentWithAuth<DashboardPageData>(() => {
  const { userGroups } = useUserGroupsQuery();

  if (!userGroups) {
    return <div>Loading</div>;
  }

  if (userGroups.length === 0) {
    return <EmptyPage />;
  }

  return (
    <div>
      {userGroups.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
});

function EmptyPage() {
  const { isDesktop, isTablet, isMobile } = useResponsive();
  const router = useRouter();

  const handleCreateTeamClick = () => {
    router.push("/addteam");
  };

  const handleJoinTeamClick = () => {
    router.push("/jointeam");
  };

  return (
    <div className="flex h-full flex-col items-center justify-center gap-12 bg-background-secondary tablet:gap-20">
      <div className="flex flex-col items-center gap-6 tablet:gap-8">
        {isDesktop && <TeamEmptyImageLarge />}
        {isTablet && <TeamEmptyImageMedium />}
        {isMobile && <TeamEmptyImageSmall />}
        <p className="text-center text-md-m text-text-default desktop:text-lg-m">
          아직 소속된 팀이 없습니다.
          <br />
          팀을 생성하거나 팀에 참여해보세요.
        </p>
      </div>
      <div className="flex w-[186px] flex-col gap-2 desktop:gap-4">
        <Button
          variant="primary"
          title="팀 생성하기"
          isFullWidth={false}
          onClick={handleCreateTeamClick}
        />
        <Button
          variant="outlinedPrimary"
          title="팀 참여하기"
          onClick={handleJoinTeamClick}
        />
      </div>
    </div>
  );
}
