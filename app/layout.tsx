import type { Metadata } from "next";
import "./globals.css";

import {Oxanium} from "next/font/google"

const oxanium = Oxanium({
  weight: "400",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "everynyan",
  description: "it's for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${oxanium.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
