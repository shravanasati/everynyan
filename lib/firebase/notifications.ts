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

export async function getUnreadNotificationCountByUser(userID:string) {
  const unreadCount = await db.collection("notifications").
    where("user", "==", userID).
    where("status", "==", "unread").
    count().get()

  return unreadCount.data().count
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

export async function markAllNotificationsRead(userID:string) {
  const notificationsRef = db.collection("notifications")
  const userNotifs = notificationsRef.where("user", "==", userID);
  const userNotifsSnap = await userNotifs.get();
  const batch = db.batch();
  userNotifsSnap.forEach((doc) => {
    batch.update(doc.ref, { status: "read" });
  });

  await batch.commit();
}