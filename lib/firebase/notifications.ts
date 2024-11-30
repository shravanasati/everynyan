import { Timestamp } from "firebase-admin/firestore";
import { db } from "./app";

type NotificationType = {
  user: string,
  title: string,
  description: string,
  status: "unread" | "read",
}

type DBNotificationType = NotificationType & {
  timestamp: Timestamp,
}

export async function saveNotifications(notifications: NotificationType[]) {
  const batch = db.batch();
  const notificationsRef = db.collection("notifications");
  notifications.forEach((notification) => {
    const notificationRef = notificationsRef.doc();
    batch.set(notificationRef, {
      ...notification,
      timestamp: Timestamp.now(),
    });
  });
  await batch.commit();
}

export async function getNotificationsByUser(userID:string) {
  const notificationsRef = db.collection("notifications").where("user", "==", userID);
  const notificationsSnap = await notificationsRef.get();
  const notifications: DBNotificationType[] = [];
  notificationsSnap.forEach((notification) => {
    notifications.push(notification.data() as DBNotificationType);
  });
  return notifications;
}