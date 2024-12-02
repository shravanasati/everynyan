import { NotificationType } from "@/lib/firebase/notifications";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";

type IndividualNotification = NotificationType & {
  timestamp: string;
};

type NotificationsProps = {
  notifs: IndividualNotification[];
};

export function Notifications({ notifs }: NotificationsProps) {
  return(
    <div className="h-screen flex flex-col bg-background p-4 sm:p-6 md:p-8">
      <div className="bg-primary text-primary-foreground px-6 py-4 flex justify-center rounded-t-lg">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold">
          Notifications
        </h2>
      </div>
      <div className="flex-grow bg-background rounded-b-lg border border-primary/10 overflow-hidden">
        <ScrollArea className="h-full">
          {notifs.length === 0 ? (
            <div className="p-6 text-primary/60 text-center">
              No notifications yet
            </div>
          ) : (
            <ul className="divide-y divide-primary/10">
              {notifs.map((notif, index) => (
                <li
                  key={index}
                  className={`hover:bg-primary/5 transition-colors duration-150 ease-in-out ${
                    notif.status === "unread" ? "bg-primary/10" : ""
                  }`}
                >
                  <Link href={notif.link} className="block px-6 py-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-primary truncate">
                          {notif.title}
                        </p>
                        <p className="text-sm text-primary/80 truncate">
                          {notif.description}
                        </p>
                        <p className="text-xs text-primary/60 mt-1">
                          {notif.timestamp}
                        </p>
                      </div>
                      {notif.status === "unread" && (
                        <div className="flex-shrink-0">
                          <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                        </div>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </div>
    </div>
  );
}
