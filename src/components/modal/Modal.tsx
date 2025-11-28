import Overlay, { type OverlayProps } from "@/components/overlay";
import { useResponsive } from "@/hooks/use-responsive";
import clsx from "clsx";
import { MouseEvent, PropsWithChildren } from "react";

export default function Modal({
  isOpen,
  children,
  onClose,
  onExit,
  allowsBackgroundDismiss,
}: PropsWithChildren<OverlayProps>) {
  const { isMobile } = useResponsive();

  const handleContentClick = (event: MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <Overlay
      overlayKey="modal"
      portalId="modal-root"
      className="tablet:flex tablet:items-center tablet:justify-center"
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
      allowsBackgroundDismiss={allowsBackgroundDismiss}
    >
      <div
        className={clsx(isMobile && "fixed right-0 bottom-0 left-0")}
        onClick={handleContentClick}
      >
        {children}
      </div>
    </Overlay>
  );
}
