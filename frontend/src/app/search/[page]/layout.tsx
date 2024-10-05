import { ButtonsFunctionality } from "@/app/_components/ButtonsFunctionality";
import Footer from "@/app/_components/Footer";
import FullNavbar from "@/app/_components/FullNavbar";
import Header from "@/app/_components/Header";
import Sidebar from "@/app/_components/Sidebar";

import { ReactNode } from "react";

export const metadata = {
  title: {
    template: "%s - Electronix",
    default: "Electronix",
  },
  description: "Electronix is a marketplace for electronics",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="md:hidden">
        <FullNavbar />
        <div className="flex overflow-x-auto">
          <Sidebar />
        </div>
      </div>
      <div className="hidden md:block">
        <FullNavbar />
      </div>
      <div className="grid md:grid-cols-[16rem_1fr] grid-rows-[auto_1fr] flex-grow bg-gray-300 h-full">
        <div className="hidden md:block bg-slate-100 dark:bg-slate-500">
          <Sidebar />
        </div>
        <div className="col-span-full md:col-span-1">
          <Header />
          <ButtonsFunctionality />
          {children}
        </div>
      </div>
      <Footer />
    </div>
  );
}
