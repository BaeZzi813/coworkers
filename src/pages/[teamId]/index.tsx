import TeamPageHeader from "@/features/group/components/TeamPageHeader";
import { prefetchGroup, useGroup } from "@/features/group/query";
import { prefetchUser, useUser } from "@/features/user/query";
import { useResponsive } from "@/hooks/use-responsive";
import {
  GSSP_NOT_FOUND_RETURN,
  gsspPropsWithTokenReturn,
} from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import clsx from "clsx";

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const params = context.params;
  const teamId = Number(params?.teamId);
  if (isNaN(teamId)) {
    return GSSP_NOT_FOUND_RETURN;
  }

  const queryClient = new QueryClient();
  await prefetchGroup(queryClient, { groupId: teamId, accessToken });
  await prefetchUser(queryClient, { accessToken });
  return gsspPropsWithTokenReturn({
    props: { groupId: teamId },
    dehydratedState: dehydrate(queryClient),
    accessToken,
  });
});

interface PageProps {
  groupId: number;
}

export default serverSideComponentWithAuth<PageProps>(({ groupId }) => {
  const { isDesktop } = useResponsive();
  const { group } = useGroup({ groupId });
  const { user } = useUser();
  const adminMember = group?.members.find((member) => member.role === "ADMIN");

  if (!group || !user || !adminMember) {
    return <div>Loading</div>;
  }

  const isAdmin = adminMember.userId === user.id;
  const tasks = group.taskLists.flatMap((taskList) => taskList.tasks);

  return (
    <div className="h-full bg-background-secondary">
      <div
        className={clsx(
          "w-full max-w-5xl",
          "tablet:px-6 tablet:pt-18",
          "desktop:px-21 desktop:pt-30"
        )}
      >
        <TeamPageHeader
          title={group.name}
          members={isDesktop ? undefined : group.members}
          isAdmin={isAdmin}
        />
        <div>{isAdmin ? "You are an admin" : "You are not an admin"}</div>
        <div>Group Name : {group.name}</div>
        <div>
          <div>Members</div>
          {group.members.map((member) => member.userName)}
        </div>
        <div>
          <div>Task Lists</div>
          {group.taskLists.map((taskList) => taskList.name)}
        </div>
        <div>
          <div>Tasks</div>
          {tasks.map((task) => task.name)}
        </div>
      </div>
    </div>
  );
});
