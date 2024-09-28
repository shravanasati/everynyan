import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { isLoggedIn } from "@/lib/user";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  if (await isLoggedIn()){
    redirect("/board");
  }

  return (
    <div className="overflow-x-hidden h-screen w-screen flex justify-center">
      <Navbar />
      <div className="flex flex-col justify-center items-center size-full bg-zinc-950 text-white p-4">
        <div className="text-center space-y-8">
          <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-center bg-clip-text text-transparent bg-gradient-to-r from-teal-300 to-blue-500">
            Hello, Everynyan!
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 max-w-2xl mx-auto">
            Your go to place for ranting, yapping, memeing, confessing and much more <br /><span className="font-black">ANONYMOUSLY</span>
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-900 text-white font-bold py-4 px-8 mt-8 rounded-full text-lg shadow-lg transform transition duration-500 hover:scale-105"
            >
              Less Freaking GO!!!
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
