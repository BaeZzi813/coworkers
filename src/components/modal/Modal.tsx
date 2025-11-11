import { useResponsive } from "@/hooks/use-responsive";
import clsx from "clsx";
import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose?: () => void;
  onExit?: () => void;
}

export default function Modal({ isOpen, children, onClose, onExit }: Props) {
  const { isMobile } = useResponsive();

  useEffect(() => {
    return () => onExit?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className={clsx(
            "fixed inset-0 z-50 bg-black/50",
            isMobile && "",
            isMobile || "flex items-center justify-center"
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div className={clsx(isMobile && "fixed right-0 bottom-0 left-0")}>
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")!
  );
}
