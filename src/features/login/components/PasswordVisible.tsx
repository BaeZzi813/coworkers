import InvisibleIcon from "@/assets/icons/ic-invisible.svg";
import VisibleIcon from "@/assets/icons/ic-visible.svg";

interface PasswordVisibleProps {
  isVisible: boolean;
  onToggle: () => void;
}

export default function PasswordVisible({
  isVisible,
  onToggle,
}: PasswordVisibleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex cursor-pointer items-center justify-center"
      aria-label={isVisible ? "비밀번호 숨기기" : "비밀번호 보기"}
    >
      {isVisible ? (
        <VisibleIcon width={24} height={24} />
      ) : (
        <InvisibleIcon width={24} height={24} />
      )}
    </button>
  );
}
