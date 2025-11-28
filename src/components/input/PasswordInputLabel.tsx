import InputLabel from "@/features/login/components/InputLabel";
import PasswordVisible from "@/features/login/components/PasswordVisible";

interface Props {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  errorMessage?: string;
  visible: boolean;
  onChange: (value: string) => void;
  onBlur: () => void;
  onVisibleChange: () => void;
}

export default function PasswordInputLabel({
  id,
  label,
  value,
  placeholder,
  errorMessage,
  visible,
  onChange,
  onBlur,
  onVisibleChange,
}: Props) {
  const VisibleButton = (
    <PasswordVisible isVisible={visible} onToggle={onVisibleChange} />
  );

  return (
    <InputLabel
      label={label}
      id={id}
      type={visible ? "text" : "password"}
      placeholder={placeholder}
      size="large"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      onBlur={onBlur}
      errorMessage={errorMessage}
      trailing={VisibleButton}
    />
  );
}
