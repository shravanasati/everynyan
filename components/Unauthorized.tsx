import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginWithNextURL } from "./LoginWithNextURL";


export function Unauthorized() {
  return (
    <div className="flex items-center justify-center min-h-[90vh] bg-background p-4">
      <div className="text-center space-y-4 sm:space-y-6 max-w-md">
        <div className="space-y-2 sm:space-y-4">
          <Image
            className="mx-auto text-muted-foreground"
            src="/frown.png"
            width={128}
            height={128}
            alt="crying chiyo chan"
          />
          <h1 className="text-2xl sm:text-4xl font-bold tracking-tighter">
            403 - Not Authorized
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Sorry, you don&apos;t have permission to access this page.
          </p>
          <p className="text-sm sm:text-base text-muted-foreground">
            Join the fun.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 justify-center">
          <Button asChild className="w-full sm:w-auto">
            <Link href="/">Go back home</Link>
          </Button>
          <LoginWithNextURL />
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: "Not Authorized",
  description: "You do not have permission to access this page",
};
