import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export interface OverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onExit?: () => void;
}

interface Props extends PropsWithChildren<OverlayProps> {
  overlayKey?: string;
  portalId: string;
  className?: string;
}

export const ANIMATION_DURATION = 0.25;

export function handleOverlayClose({
  onClose,
  onExit,
}: Pick<OverlayProps, "onClose" | "onExit">) {
  onClose();
  if (onExit) {
    setTimeout(onExit, ANIMATION_DURATION * 1000);
  }
}

export default function Overlay({
  overlayKey,
  portalId,
  className,
  isOpen,
  children,
  onClose,
  onExit,
}: Props) {
  const handleClose = () => {
    onClose();
    if (onExit) {
      setTimeout(onExit, ANIMATION_DURATION * 1000);
    }
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key={overlayKey ?? "overlay"}
          className={clsx("fixed inset-0 z-50 bg-black/50", className)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: ANIMATION_DURATION }}
          onClick={handleClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById(portalId)!
  );
}
