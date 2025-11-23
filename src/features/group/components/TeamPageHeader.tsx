import PatternImage from "@/assets/images/bg-team-pattern.png";
import Avatar from "@/components/avatar";
import { Button } from "@/components/button";
import EditDropdown from "@/components/dropdown/EditDropdown";
import Icon from "@/components/icon";
import { Alert } from "@/components/modal";
import { useResponsive } from "@/hooks/use-responsive";
import { Group } from "@/types/group";
import { Member } from "@/types/member";
import { Task } from "@/types/task";
import clsx from "clsx";
import { useRouter } from "next/router";
import { overlay } from "overlay-kit";
import { useGroupMutation } from "../query/use-group-mutation";

interface Props {
  title: string;
  group: Group;
  members?: Member[];
  tasks?: Task[];
  isAdmin: boolean;
}

export default function TeamPageHeader({
  title,
  group,
  members = [],
  tasks = [],
  isAdmin,
}: Props) {
  const { isDesktop, isMobile } = useResponsive();
  const backgroundPatternStyle =
    isAdmin || isMobile
      ? undefined
      : {
          background: `url(${PatternImage.src})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center right 68px",
        };

  return (
    <header
      className={clsx(
        "bg-background-primary tablet:rounded-[20px] tablet:shadow-card",
        isAdmin || isMobile || "rounded-xl border border-border-primary"
      )}
    >
      <div
        className={clsx("px-6", isAdmin ? "py-8" : "py-4")}
        style={backgroundPatternStyle}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h2 className="text-xl-b tablet:text-2xl-b">{title}</h2>
            {members.length > 0 && <MembersList members={members} />}
          </div>
          {isDesktop || <SettingsButton group={group} />}
        </div>
        {isAdmin && (
          <TasksReport group={group} tasks={tasks} isDesktop={isDesktop} />
        )}
      </div>
    </header>
  );
}

/* Settings Button */

function SettingsButton({ group }: { group: Group }) {
  const { isDesktop } = useResponsive();
  const { deleteMutation } = useGroupMutation();
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/${group.id}/edit`);
  };

  const handleDelete = () => {
    overlay.open(({ isOpen, close, unmount }) => {
      const handleDelete = async () => {
        deleteMutation.mutate(group.id, {
          onSuccess: () => {
            close();
            router.replace("/dashboard");
          },
          onError: (error) => {
            // TODO: Error handling
            console.error("Failed to delete group:", error);
          },
        });
      };

      return (
        <Alert
          isOpen={isOpen}
          onClose={close}
          onExit={unmount}
          title={`‘${group.name}' 팀을 정말 삭제하시겠어요?`}
          message="삭제 후에는 되돌릴 수 없습니다."
          actions={[
            <Button
              key="delete-group-close"
              variant="outlinedSecondary"
              title="닫기"
              onClick={close}
            />,
            <Button
              key="delete-group-delete"
              variant="danger"
              title="삭제하기"
              onClick={handleDelete}
            />,
          ]}
        />
      );
    });
  };

  return (
    <EditDropdown
      anchor={<Icon name="gear" />}
      alignment={isDesktop ? "left" : "right"}
      alignmentOffset={isDesktop ? -18 : -10}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  );
}

/* Tasks Report */

function calculateProgress(done: number, total: number) {
  if (total === 0) return 0;
  return done / total;
}

function TasksReport({
  group,
  tasks,
  isDesktop,
}: {
  group: Group;
  tasks: Task[];
  isDesktop: boolean;
}) {
  const totalCount = tasks.length;
  const doneCount = tasks.filter((task) => Boolean(task.doneAt)).length;
  const progress = calculateProgress(doneCount, totalCount);

  return (
    <div className="mt-9 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <ProgressLabel title="오늘의 진행 상황" progress={progress} />
        <div className="flex">
          <CountLabel title="오늘의 할 일" count={totalCount} />
          <div className="mx-6 w-px bg-border-primary" />
          <CountLabel title="완료 🙌" count={doneCount} highlighted />
        </div>
      </div>
      <div className="flex items-center gap-5">
        <ProgressBar progress={progress} />
        {isDesktop && <SettingsButton group={group} />}
      </div>
    </div>
  );
}

function ProgressLabel({
  title,
  progress,
}: {
  title: string;
  progress: number;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs-m text-state-400 tablet:text-md-m">{title}</span>
      <span className="tablet:text-4xl-b text-3xl-b text-brand-primary">
        {`${progress * 100}%`}
      </span>
    </div>
  );
}

function CountLabel({
  title,
  count,
  highlighted,
}: {
  title: string;
  count: number;
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
        {count}
      </span>
    </div>
  );
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative h-5 grow tablet:h-[27px]">
      <div className="absolute inset-0 flex justify-between overflow-hidden rounded-full bg-background-secondary">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={`progress-pattern-${index}`}
            className="h-40 -translate-y-2/4 rotate-45 border-l-20 border-[#EBEFF5] tablet:border-l-40"
          />
        ))}
      </div>
      <div
        className="absolute top-0 bottom-0 left-0 rounded-full bg-brand-primary"
        style={{ right: `${100 - progress * 100}%` }}
      />
    </div>
  );
}

/* Members List */

function avatarsWidth(numberOfMembers: number) {
  if (numberOfMembers === 1) return 24;
  if (numberOfMembers === 2) return 40;
  if (numberOfMembers === 3) return 56;
}

function avatarLeftAt(index: number, numberOfMembers: number) {
  const adjustedIndex = numberOfMembers - index - 1;
  if (adjustedIndex === 0) return 0;
  if (adjustedIndex === 1) return 16;
  if (adjustedIndex === 2) return 32;
}

function MembersList({ members }: { members: Member[] }) {
  const displayMembers = members.slice(0, 3).reverse();
  const numberOfMembers = displayMembers.length;
  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-border-primary p-1 pr-1.5">
      <div
        className="relative h-6"
        style={{ width: avatarsWidth(numberOfMembers) }}
      >
        {displayMembers.map((member, index) => (
          <Avatar
            key={member.userId}
            source={member.userImage}
            className="absolute rounded-md outline outline-white"
            size="small"
            style={{ left: avatarLeftAt(index, numberOfMembers) }}
          />
        ))}
      </div>
      <span className="text-md-m text-text-default">{members.length}</span>
    </div>
  );
}
