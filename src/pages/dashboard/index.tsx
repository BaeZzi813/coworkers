import { GET_SERVER_SIDE_PROPS_REDIRECT_RETURN } from "@/constants/ssr";
import { postAPIRefreshToken } from "@/features/auth/apis/post-refresh-token";
import { getUserGroups } from "@/features/group/apis";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

/**
 * SSR 환경에서 API 호출을 위해 access token을 사용하는 예시 코드
 */

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return GET_SERVER_SIDE_PROPS_REDIRECT_RETURN;
  }

  const { accessToken } = await postAPIRefreshToken({ refreshToken });
  const groups = await getUserGroups({ accessToken });
  return { props: { groups } };
}

export default function DashboardPage({
  groups,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      {groups.map((group) => (
        <div key={group.id}>{group.name}</div>
      ))}
    </div>
  );
}
