"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useRouter, usePathname } from "next/navigation";
import SvgLogo from "@/components/SvgLogo";
import { User } from "@/lib/user";
import { logout } from "@/lib/actions/logout";
import { Newspaper, Compass, PenTool, LogIn, LogOut, Menu, Bell } from "lucide-react";
import { useState } from "react";

export function Navbar({ user }: { user: User | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const loggedIn = user !== null;
  const [open, setOpen] = useState(false);

  const sheetLinks = [
    { href: "/", text: "Feed", icon: Newspaper },
    { href: "/board", text: "Explore", icon: Compass },
    { href: "/create", text: "Post", icon: PenTool },
    { href: "/notifications", text: "Notifications", icon: Bell },
  ];

  const handleLogout = async () => {
    await logout();
    router.push("/");
    setOpen(false);
  };

  return (
    <nav className="p-4 flex justify-between items-center">
      {/* logo */}
      <Link className="flex items-center space-x-2" href="/">
        <SvgLogo />
        <span className="text-2xl font-bold hover:text-primary/90">EveryNyan</span>
      </Link>

      {/* Buttons and sheet opener */}
      <div className="flex items-center space-x-4">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-primaryi hover:bg-primary/40">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-full bg-background/90 backdrop-blur-lg"
            side="left"
          >
            <div className="flex flex-col items-start justify-center space-y-4 p-4 max-w-md mx-auto">
              {sheetLinks.map((link) => (
                <Link
                  key={link.text}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-start space-x-4 text-xl font-bold w-full p-4 rounded-md transition-colors duration-200 ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-foreground hover:text-primary/90"
                  }`}
                >
                  <link.icon className="h-6 w-6" />
                  <span>{link.text}</span>
                </Link>
              ))}
              {loggedIn ? (
                <Button
                  onClick={handleLogout}
                  className="flex items-center justify-start space-x-4 text-xl font-bold w-full px-4 py-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                >
                  <LogOut className="h-6 w-6" />
                  <span>Log Out</span>
                </Button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-start space-x-4 text-xl font-bold w-full px-4 py-6 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
                >
                  <LogIn className="h-6 w-6" />
                  <span>Log In</span>
                </Link>
              )}
            </div>
          </SheetContent>
        </Sheet>

        {/* {loggedIn ? (
          <button
            onClick={handleLogout}
            className="font-semibold px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 hidden md:inline"
          >
            Log Out
          </button>
        ) : (
          <Link
            href="/login"
            className="font-semibold px-4 py-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 hidden md:inline"
          >
            Log In
          </Link>
        )} */}
      </div>
    </nav>
  );
}
