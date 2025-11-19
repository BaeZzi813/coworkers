import LogoFull from "@/assets/images/logo-full.svg";
import Logo from "@/assets/images/logo.svg";
import { Button } from "@/components/button";
import Icon from "@/components/icon";
import { getUserGroups } from "@/features/group/apis";
import { useResponsive } from "@/hooks/use-responsive";
import { useAuthStore } from "@/stores/auth-store";
import { useSidebarStore } from "@/stores/sidebar-store";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useShallow } from "zustand/shallow";
import Separator from "../common/Separator";
import SidebarMenu from "../common/SidebarMenu";
import UserGroupList from "../common/UserGroupList";
import SidebarProfile from "./SidebarProfile";

function sidebarWidth(isFolded: boolean) {
  return isFolded ? 72 : 270;
}

function sidebarWidthClassName(isFolded: boolean) {
  return isFolded ? `w-[72px]` : `w-[270px]`;
}

interface Props {
  className?: string;
}

export default function Sidebar({ className }: Props) {
  const [isFolded, toggle, setFold] = useSidebarStore(
    useShallow((state) => [state.isFold, state.toggle, state.setFold])
  );
  const [isLoggedIn, user] = useAuthStore(
    useShallow((state) => [state.loggedIn, state.user])
  );
  useResponsive({ onTablet: setFold });

  const handleFoldClick = () => {
    toggle();
  };

  return (
    <motion.nav
      className={clsx(
        "flex shrink-0 flex-col border-r border-border-primary bg-background-primary text-text-primary",
        sidebarWidthClassName(isFolded),
        className
      )}
      animate={{ width: sidebarWidth(isFolded) }}
      transition={{ ease: "easeInOut", duration: 0.1 }}
    >
      <header className="relative flex h-24 items-center justify-center gap-2.5">
        <LogoImage isFolded={isFolded} />
        <FoldButton isFolded={isFolded} onClick={handleFoldClick} />
      </header>
      {isLoggedIn ? <Content isFolded={isFolded} /> : <div className="grow" />}
      <footer className={clsx("pb-6", isFolded || "px-4")}>
        <div className="border-t border-border-primary pt-5">
          <SidebarProfile isFolded={isFolded} user={user} />
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

function Content({ isFolded }: { isFolded: boolean }) {
  const router = useRouter();

  const { data: groups } = useQuery({
    queryKey: ["user", "groups"],
    queryFn: () => getUserGroups(),
  });

  const handleAddTeamClick = () => {
    router.push("/addteam");
  };

  return (
    <div
      className={clsx(
        "flex grow flex-col py-6",
        isFolded ? "items-center" : "px-4"
      )}
    >
      {groups && (
        <div className="flex flex-col gap-2">
          <UserGroupList
            groups={groups}
            compact={isFolded}
            activeGroupId={Number(router.query.teamId)}
          />
          {isFolded || (
            <div>
              <Button
                variant="outlinedPrimary"
                title="팀 생성하기"
                iconName="plus"
                size="small"
                onClick={handleAddTeamClick}
              />
              <Separator />
            </div>
          )}
        </div>
      )}
      <Link href="/boards">
        <SidebarMenu
          iconName="board"
          title="자유게시판"
          compact={isFolded}
          active={router.pathname === "/boards"}
        />
      </Link>
    </div>
  );
}
