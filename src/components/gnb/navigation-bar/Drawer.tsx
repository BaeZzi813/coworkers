import { Button } from "@/components/button";
import Icon from "@/components/icon";
import Overlay, { OverlayProps } from "@/components/overlay";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, PropsWithChildren } from "react";
import Separator from "../common/Separator";
import SidebarMenu from "../common/SidebarMenu";
import UserGroupList from "../common/UserGroupList";
import { useUserGroupsQuery } from "@/features/user/query";

export default function Drawer({
  isOpen,
  onClose,
  onExit,
}: PropsWithChildren<OverlayProps>) {
  const router = useRouter();
  const { userGroups } = useUserGroupsQuery();

  const handleAddTeamClick = () => {
    router.push("/addteam");
  };

  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Overlay
      overlayKey="drawer"
      portalId="drawer-root"
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
    >
      <motion.div
        key="drawer-content"
        className="h-full w-[204px] bg-background-primary py-4"
        initial={{ translateX: -204 }}
        animate={{ translateX: 0 }}
        exit={{ translateX: -204 }}
        transition={{ duration: 0.25 }}
        onClick={handleContentClick}
      >
        <header className="mb-7 flex justify-end px-4">
          <button className="cursor-pointer" onClick={onClose}>
            <Icon name="xmark" />
          </button>
        </header>
        <div className="px-2">
          {userGroups && (
            <div>
              <UserGroupList
                groups={userGroups}
                compact={false}
                activeGroupId={Number(router.query.teamId)}
              />
              <div className="mt-2 px-2">
                <Button
                  variant="outlinedPrimary"
                  title="팀 생성하기"
                  iconName="plus"
                  size="small"
                  onClick={handleAddTeamClick}
                />
                <Separator />
              </div>
            </div>
          )}
          <Link href="/boards">
            <SidebarMenu
              iconName="board"
              title="자유게시판"
              compact={false}
              active={router.pathname === "/boards"}
            />
          </Link>
        </div>
      </motion.div>
    </Overlay>
  );
}
