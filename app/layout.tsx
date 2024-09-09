import type { Metadata } from "next";
import "./globals.css";

import { Oxanium } from "next/font/google"

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
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body
        className={`${oxanium.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
