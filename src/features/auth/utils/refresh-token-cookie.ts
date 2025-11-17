import { serialize } from "cookie";
import { jwtDecode } from "jwt-decode";

function secureCookie() {
  return process.env.NODE_ENV === "production";
}

export function serializeRefreshToken(token: string) {
  return serialize("refreshToken", token, {
    httpOnly: true,
    secure: secureCookie(),
    sameSite: "strict",
    path: "/",
    maxAge: jwtDecode(token).exp,
  });
}

export function expireRefreshToken() {
  return serialize("refreshToken", "", {
    httpOnly: true,
    secure: secureCookie(),
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
}
