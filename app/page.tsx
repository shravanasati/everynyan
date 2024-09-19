import Navbar from "@/components/Navbar";
import { link } from "fs";

export default function Home() {
  return (
    <div className="overflow-x-hidden h-screen w-screen flex justify-center">
      <Navbar />
      <div className="flex flex-col justify-center items-center size-full">
        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-center">hello everynyan</h1>
      </div>
    </div>
  );
}
