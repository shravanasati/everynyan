import { GitHubLogoIcon, InstagramLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";
import { Meow } from "@/components/Meow";

function Footer() {
  const footerItems = [
    {
      name: "github",
      icon: <GitHubLogoIcon />,
      href: "https://github.com/shravanasati/everynyan",
    },
    {
      name: "instagram",
      icon: <InstagramLogoIcon />,
      href: "https://instagram.com/everynyan.support",
    },
    // follow this syntax to add more icons
    // {
    //   name: "twitter2", 
    //   icon: <TwitterLogoIcon />,
    //   href: "https://x.com/ni3rav",
    // },

  ];

  return (
    <footer className="relative min-h-[20vh] bg-[#090909] overflow-hidden border-t-2 border-dashed">
      <div className="flex flex-col md:flex-row gap-8 px-6 sm:px-8 md:px-12 lg:px-20 py-8 justify-between items-start z-10 relative w-full max-w-7xl mx-auto">
        <div className="text-white">
          <h3 className="text-2xl font-black text-primary mb-4">EveryNyan</h3>
          <p className="text-lg text-gray-400 max-w-xs">
            Made with 😻 by SaltNPepper
          </p>
        </div>
        <div className="flex flex-col items-start">
          <h4 className="text-lg font-semibold mb-4 text-white">
            Connect With Us
          </h4>
          <div className="flex flex-wrap gap-4 relative">
            {/* map */}
            {footerItems.map((item, index) => {
              return (
                <Link
                  key={index}
                  href={item.href}
                  target="_blank"
                  className="size-10 sm:size-12 md:size-14 border border-primary/50 flex justify-center items-center rounded-lg cursor-pointer group hover:border-primary transition-colors text-primary/50 hover:text-primary"
                >
                  <span className="scale-[2]">{item.icon}</span>
                </Link>
              );
            })}
            <Meow />
            {/* map */}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
