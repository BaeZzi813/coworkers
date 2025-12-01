import Icon from "@/components/icon";
import TeamPageHeader from "@/features/group/components/TeamPageHeader";
import TeamPageTasksBoard from "@/features/group/components/TeamPageTasksBoard";
import TeamProvider from "@/features/group/components/TeamProvider";
import { prefetchGroup, useGroupQuery } from "@/features/group/query";
import { openTaskListCreateAlert } from "@/features/tasklist/components/TaskListCreateAlert";
import { prefetchUser, useUserQuery } from "@/features/user/query";
import { useResponsive } from "@/hooks/use-responsive";
import DimmedLayout from "@/layouts/DimmedLayout";
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
  const { isDesktop, isMobile } = useResponsive();
  const { group, isFetching } = useGroupQuery({ groupId });
  const { user } = useUserQuery();
  const adminMember = group?.members.find((member) => member.role === "ADMIN");

  if (!group || !user || !adminMember) {
    return <div>Loading</div>;
  }

  const isAdmin = adminMember.userId === user.id;
  const tasks = group.taskLists.flatMap((taskList) => taskList.tasks);

  const handleAddClick = () => {
    openTaskListCreateAlert({ groupId });
  };

  return (
    <div className="h-full bg-background-secondary">
      <DimmedLayout isDimmed={isFetching}>
        <TeamProvider group={group} isAdmin={isAdmin}>
          <div
            className={clsx(
              "h-full max-w-7xl overflow-y-auto pb-[54px]",
              "tablet:px-6 tablet:pt-18 tablet:pb-[74px]",
              "desktop:px-21 desktop:pt-30 desktop:pb-20"
            )}
          >
            <TeamPageHeader
              group={group}
              title={group.name}
              members={isDesktop ? undefined : group.members}
              tasks={tasks}
              isAdmin={isAdmin}
            />
            {isDesktop && isAdmin && (
              <div className="mt-9 border-t border-border-primary" />
            )}
            <div
              className={clsx(
                "flex flex-col gap-4 desktop:gap-[30px]",
                isMobile && "px-4",
                isAdmin
                  ? "mt-[34px] tablet:mt-[43px] desktop:mt-7"
                  : "mt-6 tablet:mt-[34px] desktop:mt-11"
              )}
            >
              <div className="flex items-center gap-2">
                <div>
                  할 일 목록{" "}
                  <span className="text-lg-r text-text-default">
                    ({group.taskLists.length}개)
                  </span>
                </div>
                <button
                  className="cursor-pointer rounded-lg border border-state-300 bg-background-primary p-1"
                  onClick={handleAddClick}
                >
                  <Icon
                    name="plus"
                    size="small"
                    color="var(--color-state-400)"
                  />
                </button>
              </div>
              <TeamPageTasksBoard taskLists={group.taskLists} />
            </div>
          </div>
        </TeamProvider>
      </DimmedLayout>
    </div>
  );
});
