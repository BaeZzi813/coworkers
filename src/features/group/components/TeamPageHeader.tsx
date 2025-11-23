import PatternImage from "@/assets/images/bg-team-pattern.png";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import { Member } from "@/types/member";
import { Task } from "@/types/task";
import clsx from "clsx";

interface Props {
  title: string;
  members?: Member[];
  tasks?: Task[];
  isAdmin: boolean;
}

export default function TeamPageHeader({
  title,
  members = [],
  tasks = [],
  isAdmin,
}: Props) {
  const backgroundPatternStyle = isAdmin
    ? undefined
    : {
        background: `url(${PatternImage.src})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center right 68px",
      };

  return (
    <header
      className={clsx(
        "overflow-hidden bg-background-primary tablet:rounded-[20px]",
        isAdmin || "rounded-xl border border-border-primary"
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
          {isAdmin && <Icon name="gear" />}
        </div>
        {isAdmin && <TasksReport tasks={tasks} />}
      </div>
    </header>
  );
}

/* Tasks Report */

function progress(done: number, total: number) {
  if (total === 0) return "0%";
  return `${Math.round((done / total) * 100)}%`;
}

function TasksReport({ tasks }: { tasks: Task[] }) {
  const doneTasks = tasks.filter((task) => Boolean(task.doneAt));
  const totalCount = tasks.length;
  const doneCount = doneTasks.length;

  return (
    <div className="mt-9">
      <div className="flex items-center justify-between">
        <ProgressLabel
          title="오늘의 진행 상황"
          progress={progress(doneCount, totalCount)}
        />
        <div className="flex">
          <CountLabel title="오늘의 할 일" count={totalCount} />
          <div className="mx-6 w-px bg-border-primary" />
          <CountLabel title="완료 🙌" count={doneCount} highlighted />
        </div>
      </div>
    </div>
  );
}

function ProgressLabel({
  title,
  progress,
}: {
  title: string;
  progress: string;
}) {
  return (
    <div className="flex flex-col">
      <span className="text-xs-m text-state-400 tablet:text-md-m">{title}</span>
      <span className="tablet:text-4xl-b text-3xl-b text-brand-primary">
        {progress}
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
