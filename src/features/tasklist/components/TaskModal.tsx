// TaskModal.tsx
import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Alert } from "@/components/modal";
import { useEffect, useState } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  title: string;
  defaultValue?: string;
  confirmLabel?: string;
  onSubmit: (name: string) => Promise<void>;
}

export default function TaskModal({
  isOpen,
  onClose,
  onExit,
  title,
  defaultValue = "",
  confirmLabel = "만들기",
  onSubmit,
}: TaskModalProps) {
  const [name, setName] = useState(defaultValue);

  useEffect(() => {
    setName(defaultValue);
  }, [defaultValue]);

  const trimmed = name.trim();
  const isInvalid = trimmed.length === 0;

  const handleSubmit = async () => {
    if (isInvalid) return;
    await onSubmit(trimmed);
    onClose();
  };

  return (
    <Alert
      isOpen={isOpen}
      onClose={onClose}
      onExit={onExit}
      title={title}
      content={
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="목록 명을 입력해주세요."
        />
      }
      actions={[
        <Button
          key="submit"
          title={confirmLabel}
          onClick={handleSubmit}
          disabled={isInvalid}
        />,
      ]}
    />
  );
}
