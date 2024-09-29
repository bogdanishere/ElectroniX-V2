import "./globals.css";

import { ReactNode } from "react";
import { Inter } from "next/font/google";
import ChangeCurrencyProvider from "@/context/ChangeCurrency";
import ButtonsFunctionalityProvider from "@/context/ButtonsFunctionalityContext";

const inter = Inter({ subsets: ["latin"] });

// import inter

export const metadata = {
  title: "Electronix",
  description: "Electronix is a marketplace for electronics",
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ChangeCurrencyProvider>
          <ButtonsFunctionalityProvider>
            {children}
          </ButtonsFunctionalityProvider>
        </ChangeCurrencyProvider>
      </body>
    </html>
  );
}
