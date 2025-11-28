import {
  prefetchUserHistory,
  useUserHistoryQuery,
} from "@/features/user/query";
import PageLayout from "@/layouts/PageLayout";
import { gsspPropsWithTokenReturn } from "@/libs/ssr/gssp-return";
import { gsspWithAuth } from "@/libs/ssr/with-auth";
import { dehydrate, QueryClient } from "@tanstack/react-query";

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const queryClient = new QueryClient();
  await prefetchUserHistory(queryClient, { accessToken });
  return gsspPropsWithTokenReturn({
    accessToken,
    dehydratedState: dehydrate(queryClient),
  });
});

export default function MyHistoryPage() {
  const { history } = useUserHistoryQuery();

  return (
    <PageLayout>
      <header>My History</header>
      <ul>
        {history &&
          history.map((item) => (
            <li key={item.id}>
              <div>{item.name}</div>
            </li>
          ))}
      </ul>
    </PageLayout>
  );
}
