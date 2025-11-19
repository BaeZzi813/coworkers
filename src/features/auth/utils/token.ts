import { jwtDecode } from "jwt-decode";

export function parseExpiryDateTime(token: string) {
  const { exp } = jwtDecode<{ exp: number }>(token);
  return exp * 1000;
}

export function validate(token?: string) {
  if (!token) {
    return false;
  }

  const expiryDate = parseExpiryDateTime(token);
  return Date.now() < expiryDate;
}

export function bearer(token: string) {
  return `Bearer ${token}`;
}
