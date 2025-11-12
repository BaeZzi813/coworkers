import Avatar from "@/components/avatar";
import clsx from "clsx";
import ProfileMenu from "./ProfileMenu";

interface UserInfo {
  imageUrl?: string;
  name: string;
  team: string;
}

interface Props {
  isFolded: boolean;
  userInfo?: UserInfo;
}

export default function SidebarProfile({ isFolded, userInfo }: Props) {
  if (!userInfo) {
    return <EmptyProfile isFolded={isFolded} />;
  }

  if (isFolded) {
    return (
      <div className="flex w-full cursor-pointer justify-center">
        <ProfileMenu
          anchor={<Avatar source={userInfo.imageUrl} size="medium" />}
          gap={16}
          direction="right"
          alignment="bottom"
          alignmentOffset={16}
        />
      </div>
    );
  }

  const profile = isFolded ? (
    <Avatar source={userInfo.imageUrl} size="medium" />
  ) : (
    <div className="flex cursor-pointer items-center gap-3">
      <Avatar source={userInfo.imageUrl} size="large" />
      <div className="flex flex-col items-start gap-0.5">
        <Title>{userInfo.name}</Title>
        <span className="text-md-m whitespace-nowrap text-state-400">
          {userInfo.team}
        </span>
      </div>
    </div>
  );

  return (
    <ProfileMenu
      anchor={profile}
      gap={16}
      direction="right"
      alignment="bottom"
      alignmentOffset={16}
    />
  );
}

function EmptyProfile({ isFolded }: { isFolded: boolean }) {
  const title = <Title isFolded={isFolded}>로그인</Title>;

  const handleClick = () => {
    // TODO: Go to login page
  };

  if (isFolded) {
    return (
      <button
        className="flex w-full cursor-pointer justify-center"
        onClick={handleClick}
      >
        {title}
      </button>
    );
  }

  return (
    <button
      className="flex cursor-pointer items-center gap-3"
      onClick={handleClick}
    >
      <Avatar size={isFolded ? "medium" : "large"} />
      <div className="flex flex-col items-start gap-0.5">{title}</div>
    </button>
  );
}

function Title({
  isFolded = false,
  children,
}: {
  isFolded?: boolean;
  children: string;
}) {
  return (
    <span
      className={clsx(
        "text-lg-m whitespace-nowrap",
        isFolded ? "text-text-default" : "text-text-primary"
      )}
    >
      {children}
    </span>
  );
}
