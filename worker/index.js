// listen to message event from window
self.addEventListener('message', event => {
  // HOW TO TEST THIS?
  // Run this in your browser console:
  //     window.navigator.serviceWorker.controller.postMessage({command: 'log', message: 'hello world'})
  // OR use next-pwa injected workbox object
  //     window.workbox.messageSW({command: 'log', message: 'hello world'})
  console.log(event?.data);
});

self.addEventListener('push',  (event) => {
  if (!event.data) {
    return
  }
  if (!(self.Notification && self.Notification.permission === 'granted')) {
    return
  }

  const data = event.data.json() ?? {}
  const { body, icon, image, badge, url, title } = data;
  title = data.title || "Something Has Happened"
  body = data.body || "Here's something you might want to check out."
  image = data.image || "/logo.png"
  badge = data.badge || "/logo.png"
  icon = data.icon || "/android-192x192.png"
  url = data.url || "/"
  
  const notificationOptions = {
    body,
    icon,
    image,
    data: {
      url,
    },
    badge,
  };

  event.waitUntil(
    self.registration.showNotification(title, notificationOptions)
  )
})

self.addEventListener('notificationclick',  (event) => {
  event.notification.close()
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then( (clientList) => {
      const url = event.notification.data.url;

      if (!url) return;

      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  )
})