"use client";

//import { ThemeProvider } from "@/components/theme-provider";
import { GithubProvider } from "@/app/context/GithubContext";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {/*<ThemeProvider attribute="class" defaultTheme="system" enableSystem>*/}
        <GithubProvider>
          {children}
        </GithubProvider>
      {/*</ThemeProvider>*/}
    </SessionProvider>
  );
}