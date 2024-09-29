import { ReactNode } from "react";
import NavbarAdmins from "../_components/NavbarAdmins";

export const metadata = {
  title: {
    template: "%s -  Electronix",
    default: "Electronix",
  },
  description: "Electronix is a marketplace for electronics",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <NavbarAdmins />
      {children}
    </div>
  );
}
