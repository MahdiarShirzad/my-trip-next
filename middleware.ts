import { NextRequest, NextResponse } from "next/server";

const AUTH_PAGES = ["/login", "/signup", "/forgotpass"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const role = req.cookies.get("auth-role")?.value;
  const isLoggedIn = Boolean(role);

  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));
  const isAdminArea = pathname.startsWith("/admin");
  const isUserPanelArea = pathname.startsWith("/user-panel");

  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && (isAdminArea || isUserPanelArea)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn) {
    if (role === "admin" && isUserPanelArea) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (role !== "admin" && isAdminArea) {
      return NextResponse.redirect(new URL("/user-panel", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/login",
    "/signup",
    "/forgotpass/:path*",
    "/admin/:path*",
    "/user-panel/:path*",
  ],
};
