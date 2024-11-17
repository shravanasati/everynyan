import type { Metadata } from "next";
import "./globals.css";
import "./fonts.css";
import { Navbar } from "@/components/Navbar";
import { getAuthUser } from "@/lib/user";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "everynyan",
  description: "it's for everyone",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getAuthUser();
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <script
          data-goatcounter="https://everynyan.goatcounter.com/count"
          defer
          src="//gc.zgo.at/count.js"
        ></script>
      </head>
      <body className="font-obv antialiased">
        <Navbar user={user} />
        {children}
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}
