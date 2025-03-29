import { ClerkProvider } from "@clerk/nextjs";
import { ReactNode } from "react";

export function ClerkWrapper({ children }: Readonly<{ children: ReactNode }>) {
  return <ClerkProvider>{children}</ClerkProvider>;
}
