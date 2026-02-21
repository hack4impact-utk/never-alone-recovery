import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import { ReactNode } from "react";
import { getServerSession } from "next-auth/next";

import DateLocalizationProvider from "@/providers/date-localization-provider";
import NextAuthProvider from "@/providers/next-auth-provider";
import NotistackProvider from "@/providers/notistack-provider";
import theme from "@/styles/theme";

import Header from "../components/header";
import authOptions from "./api/auth/[...nextauth]/auth-options";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Never Alone Recovery",
  description:
    "Never Alone Recovery's Admin Dashboard for managing clients, tasks, and rent payments.",
};

type RootLayoutProps = {
  children: ReactNode;
};
export default async function RootLayout({
  children,
}: RootLayoutProps): Promise<ReactNode> {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className={roboto.variable}>
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <NotistackProvider>
              <DateLocalizationProvider>
                <NextAuthProvider>
                  <CssBaseline />
                  {session && <Header />}
                  {children}
                </NextAuthProvider>
              </DateLocalizationProvider>
            </NotistackProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
