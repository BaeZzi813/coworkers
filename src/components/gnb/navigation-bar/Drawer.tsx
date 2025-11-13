import { Button } from "@/components/button";
import Icon from "@/components/icon";
import Overlay, {
  handleOverlayClose,
  OverlayProps,
} from "@/components/overlay";
import { getUserGroups } from "@/features/group/apis";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MouseEvent, PropsWithChildren } from "react";
import Separator from "../common/Separator";
import SidebarMenu from "../common/SidebarMenu";
import UserGroupList from "../common/UserGroupList";

export default function Drawer({
  isOpen,
  onClose,
  onExit,
}: PropsWithChildren<OverlayProps>) {
  const router = useRouter();

  const { data: groups } = useQuery({
    queryKey: ["user", "groups"],
    queryFn: getUserGroups,
  });

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
        <header
          className="mb-7 flex cursor-pointer justify-end px-4"
          onClick={() => handleOverlayClose({ onClose, onExit })}
        >
          <Icon name="xmark" />
        </header>
        <div className="px-2">
          {groups && (
            <div>
              <UserGroupList
                groups={groups}
                compact={false}
                activeGroupId={Number(router.query.teamId)}
              />
              <div className="mt-2 px-2">
                <Button
                  variant="outlinedPrimary"
                  title="팀 추가하기"
                  iconName="plus"
                  size="small"
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
