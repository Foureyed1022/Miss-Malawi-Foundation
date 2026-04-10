import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = request.cookies.get("session")?.value;

  // 1. Handle API headers
  const response = pathname.startsWith("/api") 
    ? NextResponse.next() 
    : null;

  if (response && pathname.startsWith("/api")) {
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  // 2. Route Protection
  const isAdminRoute = pathname.startsWith("/dashboard") || pathname.startsWith("/admin");
  const isLoginPage = pathname === "/login";

  if (isAdminRoute && !session) {
    // Not logged in -> Redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isLoginPage && session) {
    // Already logged in -> Redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response || NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};