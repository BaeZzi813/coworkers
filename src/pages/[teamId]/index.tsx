import { prefetchGroup, useGroup } from "@/features/group/query";
import { prefetchUser, useUser } from "@/features/user/query";
import {
  GSSP_NOT_FOUND_RETURN,
  gsspPropsWithTokenReturn,
} from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { dehydrate, QueryClient } from "@tanstack/react-query";

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
  const { group } = useGroup({ groupId });
  const { user } = useUser();
  const adminMember = group?.members.find((member) => member.role === "ADMIN");

  if (!group || !user || !adminMember) {
    return <div>Loading</div>;
  }

  const isAdmin = adminMember.userId === user.id;
  const tasks = group.taskLists.flatMap((taskList) => taskList.tasks);

  return (
    <div>
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
  );
});
