import { Notifications } from "@/components/Notifications";
import { Unauthorized } from "@/components/Unauthorized";
import { getNotificationsByUser } from "@/lib/firebase/notifications";
import { getAuthUser } from "@/lib/user";
import { getAgoDuration } from "@/lib/utils";

export default async function NotificationsPage() {
  const user = await getAuthUser()
  if (!user) {
    return <Unauthorized />
  }

	const notifications = await getNotificationsByUser(user.userID)
  const dateFormattedNotifs = notifications.map(notif => ({
    ...notif,
    timestamp: getAgoDuration(notif.timestamp.toDate())
  }))

  return <Notifications notifs={dateFormattedNotifs} />

}