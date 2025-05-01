import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";

import "@workspace/ui/globals.css";
import { Providers } from "@/components/providers";
import { ClerkWrapper } from "@/lib/services";

const fontSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

// --- Metadata Section ---
export const metadata: Metadata = {
  title: "Inventory Manager | Manage your shop easily",
  description:
    "Track inventory, manage your team, and organize your shop operations effortlessly with our Inventory manager.",
  keywords: [
    "inventory management",
    "shop manager",
    "team collaboration",
    "stock tracking",
  ],
  authors: [{ name: "Inventory Manager Team", url: "https://yourdomain.com" }],
  openGraph: {
    title: "Inventory Manager",
    description:
      "Simplify your shop management with easy inventory and team tracking.",
    siteName: "Inventory Manager",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Inventory Manager",
    description:
      "Simplify your shop management with easy inventory and team tracking.",
  },
};
// --- End Metadata Section ---

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkWrapper>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased `}
        >
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkWrapper>
  );
}
