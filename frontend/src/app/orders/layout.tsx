import { ReactNode } from "react";

import FullNavbar from "@/app/_components/FullNavbar";
import Footer from "../_components/Footer";

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
      <div className="bg-gray-100 p-20">{children}</div>
      <Footer />
    </div>
  );
}
