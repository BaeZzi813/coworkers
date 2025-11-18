import { jwtDecode } from "jwt-decode";

export function parseExpiryDateTime(token: string) {
  const { exp } = jwtDecode<{ exp: number }>(token);
  return exp * 1000;
}
