import { useResponsive } from "@/hooks/use-responsive";
import { motion } from "motion/react";
import { PropsWithChildren, ReactNode } from "react";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onExit?: () => void;
  title: string;
  message: string;
  content: ReactNode;
  action: ReactNode;
}

export default function Sheet({
  isOpen,
  onClose,
  onExit,
  title,
  message,
  content,
  action,
}: Props) {
  const { isMobile } = useResponsive();

  return (
    <Modal isOpen={isOpen} onClose={onClose} onExit={onExit}>
      <motion.div
        className="rounded-t-3xl bg-background-primary px-6 pt-8 pb-8 tablet:w-[384px] tablet:rounded-3xl"
        initial={{ y: isMobile ? "100%" : 0 }}
        animate={{ y: 0 }}
        exit={{ y: isMobile ? "100%" : 0 }}
        transition={{ damping: 0, duration: 0.25 }}
      >
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-4">
            <div className="text-lg-m">{title}</div>
            <div className="text-md-m text-center whitespace-pre-wrap text-text-default">
              {message}
            </div>
          </div>
          <div className="mt-6 mb-8">{content}</div>
          <div>{action}</div>
        </div>
      </motion.div>
    </Modal>
  );
}

function SheetSection({
  title,
  children,
}: PropsWithChildren<{ title: string }>) {
  return (
    <div>
      <div className="text-lg-m mb-4 text-text-primary">{title}</div>
      {children}
    </div>
  );
}

Sheet.Section = SheetSection;
