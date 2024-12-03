import { Dock } from "@/components/Dock";
import { Notifications } from "@/components/Notifications";
import { Unauthorized } from "@/components/Unauthorized";
import {
  getNotificationsByUser,
  markAllNotificationsRead,
} from "@/lib/firebase/notifications";
import { getAuthUser } from "@/lib/user";
import { getAgoDuration } from "@/lib/utils";

export default async function NotificationsPage() {
  const user = await getAuthUser();
  if (!user) {
    return <Unauthorized />;
  }

  const notifications = await getNotificationsByUser(user.userID);
  notifications.sort((a, b) => b.timestamp.toMillis() - a.timestamp.toMillis());
  const dateFormattedNotifs = notifications.map((notif) => ({
    ...notif,
    timestamp: getAgoDuration(notif.timestamp.toDate()),
  }));

  markAllNotificationsRead(user.userID);

  return (
    <>
      <Notifications notifs={dateFormattedNotifs} />
      <Dock />
    </>
  );
}
