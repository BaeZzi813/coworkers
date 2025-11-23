import PatternImage from "@/assets/images/bg-team-pattern.png";
import Avatar from "@/components/avatar";
import Icon from "@/components/icon";
import { Member } from "@/types/member";
import clsx from "clsx";

interface Props {
  title: string;
  members?: Member[];
  isAdmin: boolean;
}

export default function TeamPageHeader({
  title,
  members = [],
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
      </div>
    </header>
  );
}

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
