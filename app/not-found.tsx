import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="relative w-64 h-64 mx-auto">
          <Image
            src="/not-found.jpg"
            alt="404 Not Found"
            width={686}
            height={386}
          />
        </div>
        <p className="text-gray-600">
          OH MY GAH! The page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Button asChild className="mt-4">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
