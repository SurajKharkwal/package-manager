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
  title: "Package Manager | Manage Your Shop Effortlessly",
  description:
    "Simplify your shop management with Package Manager. Track inventory, manage your team, and monitor your shop's growth — all in one place.",
  keywords: [
    "package manager",
    "shop management",
    "inventory tracking",
    "team management",
    "small business tools",
  ],
  openGraph: {
    title: "Package Manager | Manage Your Shop Effortlessly",
    description:
      "Simplify your shop management with Package Manager. Track inventory, manage your team, and monitor your shop's growth — all in one place.",
    siteName: "Package Manager",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Package Manager | Manage Your Shop Effortlessly",
    description: "Simplify your shop management with Package Manager.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}

        <footer className="py-8 border-4 dark:bg-black mt-16">
          <div className="mx-auto max-w-7xl px-4 text-center text-neutral-600 dark:text-neutral-400">
            <div className="flex flex-col items-center justify-center gap-6">
              {/* Logo or Site Title (Optional) */}
              <div className="text-2xl pb-8 font-bold">PackageManager</div>
              <div className="mt-8 text-sm text-neutral-500 dark:text-neutral-400">
                &copy; {new Date().getFullYear()} YourPackageManager. All rights
                reserved.
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
