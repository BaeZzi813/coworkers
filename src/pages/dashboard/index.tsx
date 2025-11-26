import { prefetchUserGroups } from "@/features/group/query/prefetch-group";
import { useUserGroups } from "@/features/group/query/use-group";
import { gsspPropsWithTokenReturn } from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { UserGroup } from "@/types/group";
import { dehydrate, QueryClient } from "@tanstack/react-query";

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
  const { userGroups } = useUserGroups();

  if (!userGroups) {
    return <div>Loading</div>;
  }

  return (
    <div>
      {userGroups.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
});
