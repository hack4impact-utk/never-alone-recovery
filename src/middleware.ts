import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
});

export const config = {
  matcher: [
    // The raw regex string required to access files like images while unauthenticated.
    // eslint-disable-next-line unicorn/prefer-string-raw
    "/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)).*)",
  ],
};
