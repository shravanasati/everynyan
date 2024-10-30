import Link from "next/link";
import { Button } from "@/components/ui/button";
import SvgLogo from "@/components/SvgLogo";

export default function Navbar({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header className="p-4 flex justify-between items-center text-foreground bg-[#090909]">
      {/* logo */}
      <Link className="flex items-center space-x-2" href="/">
        <SvgLogo />
        <span className="text-2xl font-bold">EveryNyan</span>
      </Link>
      {/* logo */}

      <div className="flex items-center space-x-4">
        <Link href={loggedIn ? "/logout" : "/login"}>
          <Button
            variant="ghost"
            className="hidden md:inline-flex hover:text-primary ease-ani font-bold"
          >
            {loggedIn ? "Log Out" : "Log In"}
          </Button>
        </Link>
        <Link href="/create">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 ease-ani font-bold">
            Explore {/* add create link once done */}
          </Button>
        </Link>
      </div>
    </header>
  );
}
