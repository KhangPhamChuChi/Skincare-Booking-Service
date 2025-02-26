import React from "react";
import SidebarMenu from "@/app/components/SidebarMenu";

export const metadata = {
  title: "Garage Management System",
  description: "Manage your garage efficiently with our system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <SidebarMenu>
        <main style={{ maxWidth: "100%" }}>{children}</main>
      </SidebarMenu>
    </div>
  );
}
