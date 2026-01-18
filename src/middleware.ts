import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken");

  if (!refreshToken?.value) {
    const redirectUrl = new URL("/signin", req.url);
    redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/invite/:path*"],
};
