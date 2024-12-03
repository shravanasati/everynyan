import { getUnreadNotificationCountByUser } from "@/lib/firebase/notifications";
import { getAuthUser } from "@/lib/user";
import { Bell, Compass, HomeIcon, LucideIcon, Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import ThemeSwitcher from "./ThemeSwitcher";

type DockIconProps = {
  href: string;
  tooltipTitle: string;
  icon: LucideIcon;
};

const dockIcons = [
  { href: "/", tooltipTitle: "Feed", icon: HomeIcon },
  { href: "/board", tooltipTitle: "Explore", icon: Compass },
  { href: "/create", tooltipTitle: "Post", icon: Plus },
  { href: "/notifications", tooltipTitle: "Notifications", icon: Bell },
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
export async function UnreadNotificationCount({ userID }: { userID: string }) {
  const count = await getUnreadNotificationCountByUser(userID);

  if (count === 0) return null;

  return (
    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
      {count > 9 ? "9+" : count}
    </span>
  );
}

export async function Dock() {
  const user = await getAuthUser();

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 md:scale-100 scale-90"> 
      <div className="flex gap-6 border border-primary/10 rounded-full px-4 py-3 md:backdrop-blur-md backdrop-blur-lg">
        {dockIcons.map((dockIcon, index) => (
          <div key={index} className="relative">
            <DockIcon
              href={dockIcon.href}
              tooltipTitle={dockIcon.tooltipTitle}
              icon={dockIcon.icon}
            />
            {dockIcon.href === "/notifications" && (
              <Suspense fallback={<div className="size-5" />}>
                <UnreadNotificationCount userID={user!.userID} />
              </Suspense>
            )}
          </div>
        ))}
        <ThemeSwitcher />
      </div>
    </div>
  );
}
