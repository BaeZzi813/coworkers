import Icon from "@/components/icon";
import { useResponsive } from "@/hooks/use-responsive";
import { motion } from "motion/react";
import { ReactNode } from "react";
import Modal from "./Modal";

interface Props {
  isOpen: boolean;
  onClose?: () => void;
  onExit?: () => void;
  header?: ReactNode;
  title: string;
  message?: string;
  content?: ReactNode;
  actions?: ReactNode[];
}

export default function Alert({
  isOpen,
  onClose,
  onExit,
  header,
  title,
  message,
  content,
  actions = [],
}: Props) {
  const { isMobile } = useResponsive();

  return (
    <Modal isOpen={isOpen} onClose={onClose} onExit={onExit}>
      <motion.div
        className={
          "rounded-t-3xl bg-background-primary px-4 pt-4 pb-8 tablet:w-[384px] tablet:rounded-3xl"
        }
        initial={{ y: isMobile ? "100%" : 0 }}
        animate={{ y: 0 }}
        exit={{ y: isMobile ? "100%" : 0 }}
        transition={{ damping: 0, duration: 0.25 }}
      >
        <div className="flex h-6 justify-end">
          {onClose && (
            <button className="cursor-pointer" onClick={onClose}>
              <Icon name="xmark" />
            </button>
          )}
        </div>
        <div className="mx-8 flex flex-col">
          {header && <div className="mb-4 self-center">{header}</div>}
          <div className="flex flex-col items-center gap-2">
            <div className="text-lg-m">{title}</div>
            {message && (
              <div className="text-md-m text-center whitespace-pre-wrap">
                {message}
              </div>
            )}
          </div>
          {content && <div className="mt-4">{content}</div>}
          <div className="mt-6 flex gap-2">
            {actions.map((action) => action)}
          </div>
        </div>
      </motion.div>
    </Modal>
  );
}
