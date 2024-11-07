"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import SvgLogo from "@/components/SvgLogo";
import { User } from "@/lib/user";
import { logout } from "@/lib/actions/logout";

export default function Navbar({user} : {user: User | null}) {
  const loggedIn = user !== null
  return (
    <header className="p-4 flex justify-between items-center text-foreground">
      {/* logo */}
      <Link className="flex items-center space-x-2" href="/">
        <SvgLogo />
        <span className="text-2xl font-bold">EveryNyan</span>
      </Link>
      {/* logo */}

      <div className="flex items-center space-x-4">
        {!loggedIn && (
        <Link href="/login">
          <Button
            variant="ghost"
            className="hidden md:inline-flex hover:text-primary ease-ani font-bold"
          >
            Log In
          </Button>
        </Link>
        )}
        {loggedIn && (
          <Button
            variant="ghost"
            className="hidden md:inline-flex hover:text-primary ease-ani font-bold"
            onClick={async () => {await logout()}}
          >
            Log Out
          </Button>
        )}
        <Link href="/create">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 ease-ani font-bold">
            Explore {/* add create link once done */}
          </Button>
        </Link>
      </div>
    </header>
  );
}
