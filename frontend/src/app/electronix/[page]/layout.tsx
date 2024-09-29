import { ButtonsFunctionality } from "@/app/_components/ButtonsFunctionality";
import Footer from "@/app/_components/Footer";
import FullNavbar from "@/app/_components/FullNavbar";
import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar";

import { ReactNode } from "react";

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
      <FullNavbar />
      <div className="grid grid-cols-[16rem_1fr] grid-rows-[auto_1fr] h-screen bg-gray-300">
        <Sidebar />
        <ButtonsFunctionality />
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}
