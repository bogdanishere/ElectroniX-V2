import { ReactNode } from "react";

import FullNavbar from "@/app/_components/FullNavbar";
import { ButtonsFunctionality } from "@/app/_components/ButtonsFunctionality";

export const metadata = {
  title: {
    template: "%s -  Electronix",
    default: "Electronix",
  },
  description: "Electronix is a marketplace for electronics",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div>
      <FullNavbar />
      <ButtonsFunctionality />
      <div className="bg-gray-100 p-20">{children}</div>
    </div>
  );
}
