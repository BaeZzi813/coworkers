import TeamEmptyImageLarge from "@/assets/images/team-empty-large.svg";
import TeamEmptyImageMedium from "@/assets/images/team-empty-medium.svg";
import TeamEmptyImageSmall from "@/assets/images/team-empty-small.svg";
import { Button } from "@/components/button";
import { prefetchGroups, useGroupsQuery } from "@/features/group/query";

import { useResponsive } from "@/hooks/use-responsive";
import { gsspPropsWithTokenReturn } from "@/libs/ssr/gssp-return";
import {
  gsspWithAuth,
  serverSideComponentWithAuth,
} from "@/libs/ssr/with-auth";
import { Group } from "@/types/group";
import { Task } from "@/types/task";
import { dehydrate, QueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { Attributes } from "react";

interface DashboardPageData {
  groups: Group[];
}

export const getServerSideProps = gsspWithAuth(async (context, accessToken) => {
  const queryClient = new QueryClient();
  await prefetchGroups(queryClient, { accessToken });
  return gsspPropsWithTokenReturn({
    accessToken,
    dehydratedState: dehydrate(queryClient),
  });
});

export default serverSideComponentWithAuth<DashboardPageData>(() => {
  const { groups, isPending } = useGroupsQuery();

  if (groups?.length === 0) {
    return <EmptyPage />;
  }

  return (
    <div className="h-full bg-background-secondary px-6 pt-5 tablet:px-10 tablet:pt-10 desktop:px-16 desktop:pt-20">
      {isPending || (
        <div className="flex max-w-5xl flex-col gap-4 tablet:gap-6 desktop:gap-10">
          <h2 className="text-xl-b text-text-primary tablet:text-2xl-b">
            Dashboard
          </h2>
          {groups && <GroupList groups={groups} />}
        </div>
      )}
    </div>
  );
});

function GroupList({ groups }: { groups: Group[] }) {
  return (
    <div className="flex flex-col gap-6">
      {groups.map((group) => {
        const tasks = group.taskLists.flatMap((taskList) => taskList.tasks);
        return (
          <Link href={`/${group.id}`} key={group.id}>
            <GroupListItem title={group.name} tasks={tasks} />
          </Link>
        );
      })}
    </div>
  );
}

function calculateProgress(done: number, total: number) {
  if (total === 0) return 0;
  return done / total;
}

function GroupListItem({
  key,
  title,
  tasks,
}: { title: string; tasks: Task[] } & Attributes) {
  const totalCount = tasks.length;
  const doneCount = tasks.filter((task) => Boolean(task.doneAt)).length;
  const progress = calculateProgress(doneCount, totalCount);

  return (
    <div
      key={key}
      className="flex flex-col rounded-[20px] border border-border-primary bg-background-primary px-6 py-5"
    >
      <h3 className="text-lg-s tablet:text-2lg-s">{title}</h3>
      <div className="flex self-end">
        <Label
          title="오늘의 진행 상황"
          value={`${(progress * 100).toFixed(0)}%`}
        />
        <div className="mx-6 w-px bg-border-primary" />
        <Label title="오늘의 할 일" value={totalCount} highlighted={false} />
        <div className="mx-6 w-px bg-border-primary" />
        <Label title="완료 🙌" value={doneCount} />
      </div>
    </div>
  );
}

function Label({
  title,
  value,
  highlighted = true,
}: {
  title: string;
  value: string | number;
  highlighted?: boolean;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-xs-m text-state-400">{title}</span>
      <span
        className={clsx(
          "text-2xl-b tablet:text-3xl-b",
          highlighted ? "text-brand-primary" : "text-text-default"
        )}
      >
        {value}
      </span>
    </div>
  );
}

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
