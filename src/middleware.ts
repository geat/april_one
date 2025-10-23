import { NextResponse, type NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "./routes";

export async function middleware(request: NextRequest) {
  const session = getSessionCookie(request);

  const isApiAuth = request.nextUrl.pathname.startsWith(apiAuthPrefix);

  // Allow public API routes
  const isPublicApiRoute = request.nextUrl.pathname.startsWith("/api/website") ||
                          request.nextUrl.pathname.startsWith("/api/products") ||
                          request.nextUrl.pathname.startsWith("/api/uploads");

  const isPublicRoute = publicRoutes.includes(request.nextUrl.pathname) ||
                        publicRoutes.some((route) => request.nextUrl.pathname.startsWith(route));

  const isAuthRoute = () => {
    return authRoutes.some((path) => request.nextUrl.pathname.startsWith(path));
  };

  if (isApiAuth) {
    return NextResponse.next();
  }

  // Allow public API routes without authentication
  if (isPublicApiRoute) {
    return NextResponse.next();
  }

  if (isAuthRoute()) {
    if (session) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url),
      );
    }
    return NextResponse.next();
  }

  if (!session && !isPublicRoute) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
