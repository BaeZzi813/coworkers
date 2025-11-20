import { NextResponse, type NextRequest } from "next/server";
import { validate } from "./features/auth/utils/token";

export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const isValidToken = validate(refreshToken);
  const isLandingPage = request.nextUrl.pathname === "/";
  const isLoginOrSignupPage = ["/login", "/signup"].includes(
    request.nextUrl.pathname
  );

  if (isValidToken) {
    if (isLoginOrSignupPage) {
      return redirect("/dashboard", request.url);
    } else {
      return next();
    }
  } else {
    if (isLandingPage || isLoginOrSignupPage) {
      return next();
    } else {
      return redirect("/login", request.url);
    }
  }
}

function redirect(path: string, base: string) {
  return NextResponse.redirect(new URL(path, base));
}

function next() {
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/dashboard",
    "/addteam",
    "/jointeam",
    "/myhistory",
    "/mypage",
    "/boards",
    "/:teamid",
    "/:teamid/tasklist",
    "/:teamid/:taskid",
  ],
};
