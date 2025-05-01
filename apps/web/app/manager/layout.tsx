import type { Metadata } from "next";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@workspace/ui/components/sidebar";
import { SiteHeader } from "@/components/site-header";

export const metadata: Metadata = {
  title: "Dashboard | Inventory Manager",
  description:
    "Manage your shop’s inventory, team, and growth with the Inventory Manager dashboard.",
  keywords: [
    "shop dashboard",
    "inventory management",
    "team management",
    "Inventory Manager",
  ],
  openGraph: {
    title: "Dashboard | Inventory Manager",
    description:
      "Effortlessly manage your inventory and team using the Inventory Manager dashboard.",
    siteName: "Inventory Manager",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    title: "Dashboard | Inventory Manager",
    description: "Your control center for inventory and team management.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
