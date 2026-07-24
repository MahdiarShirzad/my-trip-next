import { NextRequest, NextResponse } from "next/server";

interface TokenPayload {
  id: string;
  email: string;
  role: "user" | "admin";
  exp?: number;
}

function decodeToken(token: string): TokenPayload | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

const AUTH_PAGES = ["/login", "/signup", "/forgotpass"];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const refreshToken = req.cookies.get("refreshToken")?.value;

  const payload = refreshToken ? decodeToken(refreshToken) : null;
  const isExpired = payload?.exp ? payload.exp * 1000 < Date.now() : true;
  const isLoggedIn = Boolean(payload) && !isExpired;

  const isAuthPage = AUTH_PAGES.some((page) => pathname.startsWith(page));
  const isAdminArea = pathname.startsWith("/admin");
  const isUserPanelArea = pathname.startsWith("/user-panel");

  // ۱. اگه لاگین کرده، به لاگین/ساین‌آپ نره
  if (isLoggedIn && isAuthPage) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!isLoggedIn && (isAdminArea || isUserPanelArea)) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (isLoggedIn && payload) {
    if (payload.role === "admin" && isUserPanelArea) {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (payload.role !== "admin" && isAdminArea) {
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
