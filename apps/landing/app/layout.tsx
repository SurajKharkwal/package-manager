import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
