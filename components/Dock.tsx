import { Compass, HomeIcon, LucideIcon, Plus } from "lucide-react";
import Link from "next/link";

type DockIconProps = {
  href: string;
  tooltipTitle: string;
  icon: LucideIcon;
};

const dockIcons = [
  { href: "/", tooltipTitle: "Feed", icon: HomeIcon },
  { href: "/create", tooltipTitle: "Post", icon: Plus },
  { href: "/board", tooltipTitle: "Explore", icon: Compass },
];

export function DockIcon({ href, tooltipTitle, icon: Icon }: DockIconProps) {
  return (
    <Link
      href={href}
      title={tooltipTitle}
      rel="noopener noreferrer"
      className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-primary/15 hover:border-primary transition-colors duration-200 hover:text-primary text-primary/80"
    >
      <Icon size={20} className="hover:text-primary" />
    </Link>
  );
}

export function Dock() {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex gap-6 border border-primary/10 rounded-full px-4 py-3 backdrop-blur-md">
        {dockIcons.map((dockIcon, index) => (
          <DockIcon
            key={index}
            href={dockIcon.href}
            tooltipTitle={dockIcon.tooltipTitle}
            icon={dockIcon.icon}
          />
        ))}
      </div>
    </div>
  );
}
