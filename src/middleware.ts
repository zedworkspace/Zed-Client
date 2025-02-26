import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken");
  if (!refreshToken?.value) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }
  return NextResponse.next();
}
export const config = {
  matcher: ["/"],
};
