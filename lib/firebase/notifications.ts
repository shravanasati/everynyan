import { Timestamp } from "firebase-admin/firestore";
import { db } from "./app";

export type NotificationType = {
  user: string,
  title: string,
  description: string,
  status: "unread" | "read",
  link: string,
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

export async function getUnreadNotificationCountByUser(userToken:string) {
  const unreadCount = await db.collection("notifications").
    where("user", "==", userToken).
    where("status", "==", "unread").
    count().get()

  return unreadCount.data().count
}

export async function getNotificationsByUser(userToken:string) {
  const notificationsRef = db.collection("notifications").where("user", "==", userToken);
  const notificationsSnap = await notificationsRef.get();
  const notifications: DBNotificationType[] = [];
  notificationsSnap.forEach((notification) => {
    notifications.push(notification.data() as DBNotificationType);
  });
  return notifications;
}

export async function markAllNotificationsRead(userToken:string) {
  const notificationsRef = db.collection("notifications")
  const userNotifs = notificationsRef.where("user", "==", userToken);
  const userNotifsSnap = await userNotifs.get();
  const batch = db.batch();
  userNotifsSnap.forEach((doc) => {
    batch.update(doc.ref, { status: "read" });
  });

  await batch.commit();
}