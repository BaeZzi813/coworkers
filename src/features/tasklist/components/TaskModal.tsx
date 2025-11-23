import { Button } from "@/components/button";
import { Input } from "@/components/input";
import { Alert } from "@/components/modal";
import { useState } from "react";

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExit: () => void;
  title: string;
  onSubmit: (name: string) => Promise<void>;
}

export default function TaskModal({
  isOpen,
  onClose,
  onExit,
  title,
  onSubmit,
}: TaskModalProps) {
  const [name, setName] = useState("");

  const trimmed = name.trim();
  const isInvalid = trimmed.length === 0;

  const handleSubmit = async () => {
    if (name.trim().length === 0) return;

    await onSubmit(name.trim());
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
          key="create-todo"
          title="만들기"
          onClick={handleSubmit}
          disabled={isInvalid}
        />,
      ]}
    />
  );
}
