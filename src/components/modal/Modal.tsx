import { AnimatePresence, motion } from "motion/react";
import { PropsWithChildren, useEffect } from "react";
import { createPortal } from "react-dom";

interface Props extends PropsWithChildren {
  isOpen: boolean;
  onClose?: () => void;
  onExit?: () => void;
}

export default function Modal({ isOpen, children, onClose, onExit }: Props) {
  useEffect(() => {
    return () => onExit?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    document.getElementById("modal-root")!
  );
}
