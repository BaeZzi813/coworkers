import { serialize } from "cookie";
import { parseExpiryDateTime } from "./token";

export const REFRESH_TOKEN_COOKIE_NAME = "refreshToken";

export function createJWTCookie({
  name,
  jwtToken,
}: {
  name: string;
  jwtToken: string;
}) {
  return serialize(name, jwtToken, {
    httpOnly: true,
    secure: secureCookie(),
    sameSite: "strict",
    path: "/",
    maxAge: parseExpiryDateTime(jwtToken),
  });
}

export function createExpiredCookie({ name }: { name: string }) {
  return serialize(name, "", {
    httpOnly: true,
    secure: secureCookie(),
    sameSite: "strict",
    path: "/",
    expires: new Date(0),
  });
}

function secureCookie() {
  return process.env.NODE_ENV === "production";
}
