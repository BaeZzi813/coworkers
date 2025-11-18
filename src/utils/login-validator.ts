export type ValidationResult = {
  valid: boolean;
  reason?: string;
};

export function isValidEmail(email: string): boolean {
  return validateEmail(email).valid;
}

export function isValidPassword(password: string): boolean {
  return validatePassword(password).valid;
}

export function isValidName(name: string): boolean {
  return validateName(name).valid;
}

export function validateEmail(email: string): ValidationResult {
  const trimmed = String(email ?? "").trim();
  if (trimmed.length === 0) {
    return { valid: false, reason: "이메일을 입력해주세요." };
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(trimmed)) {
    return { valid: false, reason: "이메일 형식으로 작성해주세요." };
  }
  return { valid: true };
}

export function validatePassword(password: string): ValidationResult {
  const value = String(password ?? "");
  if (value.length === 0) {
    return { valid: false, reason: "비밀번호를 입력해주세요." };
  }
  if (value.length < 8) {
    return { valid: false, reason: "8자리 이상 입력해주세요." };
  }
  const hasSpecial = /[^A-Za-z0-9]/.test(value);
  if (!hasSpecial) {
    return { valid: false, reason: "특수문자를 1개 이상 포함하여야 합니다." };
  }
  return { valid: true };
}

export function validateName(name: string): ValidationResult {
  const trimmed = String(name ?? "").trim();
  if (trimmed.length === 0) {
    return { valid: false, reason: "이름을 입력해주세요." };
  }
  return { valid: true };
}
