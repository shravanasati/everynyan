/// <reference lib="webworker" />
import {initializeApp} from "firebase/app"
import {getMessaging, onBackgroundMessage} from "firebase/messaging/sw"
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging.js");

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDhumzKTSCsIFt-bo0qbLDRdn-Xd9fizEw",
  authDomain: "everynyan-a02ed.firebaseapp.com",
  projectId: "everynyan-a02ed",
  messagingSenderId: "221415288442",
  appId: "1:221415288442:web:bd4ad1e6953f71d50cd5c3",
};

const app = initializeApp(firebaseConfig);

const messaging = getMessaging(app);

// Handle background messages
onBackgroundMessage(messaging, (payload: any) => {
  console.log("Received background message: ", payload);

  const notificationTitle = payload.notification?.title || "Notification";
  const notificationOptions = {
    body: payload.notification?.body || "You have a new message.",
    icon: payload.notification?.icon || "/default-icon.png", // Replace with your app's icon
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
