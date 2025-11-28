import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onExit?: () => void;
  dismissable?: boolean;
}

interface Props extends PropsWithChildren<OverlayProps> {
  overlayKey?: string;
  portalId: string;
  className?: string;
}

const ANIMATION_DURATION = 0.25;

export default function Overlay({
  overlayKey,
  portalId,
  className,
  dismissable = true,
  isOpen,
  children,
  onClose,
  onExit,
}: Props) {
  const handleBackgroundClick = () => {
    if (!dismissable) return;
    onClose();
  };

  return createPortal(
    <AnimatePresence onExitComplete={onExit}>
      {isOpen && (
        <motion.div
          key={overlayKey ?? "overlay"}
          className={clsx("fixed inset-0 z-50 bg-black/50", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATION }}
          onClick={handleBackgroundClick}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById(portalId)!
  );
}
