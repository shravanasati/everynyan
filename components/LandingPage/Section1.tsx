import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Section1() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <HeroTitle />
      <HeroDescription />
    </div>
  );
}

function HeroTitle() {
  return (
    <div className="w-full flex justify-center">
      <h1 className="text-4xl md:text-7xl md:tracking-widest bg-gradient-to-b from-yellow-500 to-orange-200 bg-clip-text text-transparent">
        Hello EveryNyan!
      </h1>
    </div>
  );
}

function HeroDescription() {
  return (
    <div className="w-full flex justify-center mt-4 bg-gradient-to-t from-yellow-50 to-amber-100 bg-clip-text text-transparent text-lg">
      Your anonymous haven for rants, gossip, confessions, and spilling the tea!
    </div>
  );
}

function ButtonGroup() {

}

function Label(){
  
}