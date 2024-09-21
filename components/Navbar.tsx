"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-zinc-900 shadow-md z-50 fixed sm:min-w-[50%] mt-8  rounded-2xl min-w-[80%]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-3xl font-black text-zinc-50">
              Everynyan
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/"
                className="text-zinc-100 hover:text-zinc-400 px-3 py-2 rounded-md text-xl font-medium"
              >
                Home
              </Link>
              <Link
                href="/login"
                className="text-zinc-100 hover:text-zinc-400 px-3 py-2 rounded-md text-xl font-medium"
              >
                LogIn
              </Link>
              <Link
                href="/tnc"
                className="text-zinc-100 hover:text-zinc-400 px-3 py-2 rounded-md text-xl font-medium"
              >
                TnC
              </Link>
              <Link
                href="https://github.com/shravanasati/everynyan"
                className="text-zinc-100 hover:text-zinc-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                GitHub
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-zinc-400 hover:text-zinc-500  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-zinc-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="text-zinc-100 hover:text-zinc-900 block px-3 py-2 rounded-md text-xl font-medium"
            >
              Home
            </Link>
            <Link
              href="/login"
              className="text-zinc-100 hover:text-zinc-900 block px-3 py-2 rounded-md text-xl font-medium"
            >
              LogIn
            </Link>
            <Link
              href="/tnc"
              className="text-zinc-100 hover:text-zinc-900 block px-3 py-2 rounded-md text-xl font-medium"
            >
              TnC
            </Link>
            <Link
              href="/contact"
              className="text-zinc-100 hover:text-zinc-900 block px-3 py-2 rounded-md text-xl font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
