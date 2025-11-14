import Overlay, { type OverlayProps } from "@/components/overlay";
import { useResponsive } from "@/hooks/use-responsive";
import clsx from "clsx";
import { PropsWithChildren } from "react";

export default function Modal({
  isOpen,
  children,
  onClose,
  onExit,
}: PropsWithChildren<OverlayProps>) {
  const { isMobile } = useResponsive();

  return (
    <Overlay
      overlayKey="modal"
      portalId="modal-root"
      className="tablet:flex tablet:items-center tablet:justify-center"
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
    >
      <div className={clsx(isMobile && "fixed right-0 bottom-0 left-0")}>
        {children}
      </div>
    </Overlay>
  );
}
