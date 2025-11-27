import TeamEditPageBase from "@/features/group/components/TeamEditPageBase";
import { prefetchGroup, useGroupQuery } from "@/features/group/query";
import {
  GSSP_NOT_FOUND_RETURN,
  gsspPropsWithTokenReturn,
} from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { dehydrate, QueryClient } from "@tanstack/react-query";

interface PageProps {
  groupId: number;
}

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const params = context.params;
  const groupId = Number(params?.teamId);
  if (isNaN(groupId)) {
    return GSSP_NOT_FOUND_RETURN;
  }

  const queryClient = new QueryClient();
  await prefetchGroup(queryClient, { groupId, accessToken });
  return gsspPropsWithTokenReturn({
    props: { groupId },
    accessToken,
    dehydratedState: dehydrate(queryClient),
  });
});

export default serverSideComponentWithAuth<PageProps>(({ groupId }) => {
  const { group } = useGroupQuery({ groupId });
  return <TeamEditPageBase group={group} />;
});
