import { getUserGroups } from "@/features/group/apis";
import { gsspPropsWithTokenReturn } from "@/libs/ssr/gssp-return";
import {
  getServerSidePropsWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { UserGroup } from "@/types/user-group";

/**
 * SSR 환경에서 API 호출을 위해 access token을 사용하는 예시 코드
 */

interface DashboardPageData {
  groups: UserGroup[];
}

export const getServerSideProps = getServerSidePropsWithAuth(
  async (context, accessToken) => {
    const groups = await getUserGroups({ accessToken });
    return gsspPropsWithTokenReturn({ groups }, accessToken);
  }
);

export default serverSideComponentWithAuth<DashboardPageData>(({ groups }) => {
  return (
    <div>
      {groups.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
});
