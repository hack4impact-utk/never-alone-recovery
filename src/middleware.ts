import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    const isAskForAccessPage = pathname.startsWith("/ask-for-access");

    if (token?.user?.role === "disabled" && !isAskForAccessPage) {
      return NextResponse.redirect(new URL("/ask-for-access", req.url));
    }

    return NextResponse.next();
  },
  {
    pages: {
      signIn: "/login",
      error: "/error",
    },
  },
);

export const config = {
  matcher: [
    // The raw regex string required to access files like images while unauthenticated.
    // eslint-disable-next-line unicorn/prefer-string-raw
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
