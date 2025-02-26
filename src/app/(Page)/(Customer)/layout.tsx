import React from "react";
import NavbarMenu from "@/app/components/NavBarMenu";
import Footers from "@/app/components/Footer";

export const metadata = {
  title: "Dịch vụ chăm sóc da",
  description: "Manage your garage efficiently with our system.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <NavbarMenu>
        <main>{children}</main>
      </NavbarMenu>
      <Footers />
    </div>
  );
}
