"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import NextTopLoader from "nextjs-toploader";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme
    >
      <NextTopLoader color="#FFF" />
      {children}
    </NextThemesProvider>
  );
}
