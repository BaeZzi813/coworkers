import LogoFull from "@/assets/images/logo-full.svg";
import Logo from "@/assets/images/logo.svg";
import Icon from "@/components/icon";
import clsx from "clsx";
import { motion } from "motion/react";
import { useState } from "react";
import Avatar from "../avatar";
import NavigationLink from "./NavigationLink";

function sidebarWidth(isFolded: boolean) {
  return isFolded ? 72 : 270;
}

function sidebarWidthClassName(isFolded: boolean) {
  return isFolded ? `w-[72px]` : `w-[270px]`;
}

export default function Sidebar() {
  const [isFolded, setIsFolded] = useState(false);

  const handleFoldClick = () => {
    setIsFolded(!isFolded);
  };

  return (
    <motion.nav
      className={clsx(
        "flex h-dvh shrink-0 flex-col border-r border-border-primary bg-background-primary text-text-primary",
        sidebarWidthClassName(isFolded)
      )}
      animate={{ width: sidebarWidth(isFolded) }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
    >
      <header className="relative flex h-24 items-center justify-center gap-2.5">
        <LogoImage isFolded={isFolded} />
        <FoldButton isFolded={isFolded} onClick={handleFoldClick} />
      </header>
      <div
        className={clsx(
          "flex grow flex-col py-6",
          isFolded ? "items-center" : "px-4"
        )}
      >
        {/* TODO: 로그아웃 상태에서 숨김 필요 */}
        <NavigationLink
          href="/boards"
          iconName="board"
          title="자유게시판"
          compact={isFolded}
          active={true}
        />
        <NavigationLink
          href="/boards"
          iconName="board"
          title="자유게시판"
          compact={isFolded}
          active={false}
        />
      </div>
      <footer className={clsx("pb-6", isFolded || "px-4")}>
        <div className="border-t border-border-primary pt-5">
          {/* TODO: 로그아웃 상태에서는 info에 undefined/null이 전달되어 '로그인'으로 표시 */}
          <Profile
            isFolded={isFolded}
            info={{ name: "안해나", team: "경영관리팀" }}
          />
        </div>
      </footer>
    </motion.nav>
  );
}

function LogoImage({ isFolded }: { isFolded: boolean }) {
  return isFolded ? <Logo /> : <LogoFull />;
}

function FoldButton({
  isFolded,
  onClick,
}: {
  isFolded: boolean;
  onClick: () => void;
}) {
  return (
    <button
      className={clsx(
        "cursor-pointer",
        isFolded &&
          "absolute -right-4 flex size-8 items-center justify-center rounded-full border border-border-primary bg-background-primary"
      )}
      onClick={onClick}
    >
      <Icon
        name={isFolded ? "expand" : "fold"}
        size={isFolded ? "small" : "large"}
      />
    </button>
  );
}

function Profile({
  isFolded,
  info,
}: {
  isFolded: boolean;
  info?: {
    imageUrl?: string;
    name: string;
    team: string;
  };
}) {
  const avatar = (
    <Avatar source={info?.imageUrl} size={isFolded ? "medium" : "large"} />
  );
  const title = (
    <span
      className={clsx(
        "text-lg-m whitespace-nowrap",
        isFolded ? "text-text-default" : "text-text-primary"
      )}
    >
      {info?.name ?? "로그인"}
    </span>
  );

  if (isFolded) {
    return (
      <button className="flex w-full cursor-pointer justify-center">
        {info ? avatar : title}
      </button>
    );
  }

  return (
    <button className="flex cursor-pointer items-center gap-3">
      {avatar}
      <div className="flex flex-col items-start gap-0.5">
        {title}
        {info?.team && (
          <span className="text-md-m whitespace-nowrap text-state-400">
            {info.team}
          </span>
        )}
      </div>
    </button>
  );
}
