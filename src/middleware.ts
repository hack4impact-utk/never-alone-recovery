import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
});

export const config = {
  matcher: [
    String.raw`/((?!api|_next/static|_next/image|favicon.ico|.\.(?:svg|png|jpg|jpeg|gif|webp)$).)`,
  ],
};
