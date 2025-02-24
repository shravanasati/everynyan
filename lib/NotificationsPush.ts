const SERVICE_WORKER_FILE_PATH = "./sw.js";

export function isNotificationSupported(): boolean {
  let unsupported = false;
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("showNotification" in ServiceWorkerRegistration.prototype)
  ) {
    unsupported = true;
  }
  return !unsupported;
}

export function isPermissionGranted(): boolean {
  return Notification.permission === "granted";
}

export function isPermissionDenied(): boolean {
  return Notification.permission === "denied";
}

async function requestNotificationPermission() {
  if (isPermissionGranted()) {
    return true;
  }
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    return true;
  }
  return false;
}

function urlBase64ToUint8Array(base64String: string) {
  if (base64String === "") {
    throw new Error("NEXT_PUBLIC_VAPID_PUBLIC_KEY not set")
  }

  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding)
    .replace(/\\-/g, '+')
    .replace(/_/g, '/')

  const rawData = Buffer.from(base64, 'base64').toString('binary')
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export async function registerAndSubscribe(onSubscribe: (subs: PushSubscription | null) => void,
  onError: (e: Error) => void): Promise<void> {
  try {
    await navigator.serviceWorker.register(SERVICE_WORKER_FILE_PATH);
    //subscribe to notification
    navigator.serviceWorker.ready
      .then((registration: ServiceWorkerRegistration) => {
        requestNotificationPermission().then(success => {
          if (!success) {
            throw new Error("Permission denied");
          }
        })
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ""),
        });
      })
      .then((subscription: PushSubscription) => {
        console.info("Created subscription Object: ", subscription.toJSON());
        onSubscribe(subscription);
      })
      .catch((e) => {
        onError(e);
      });
  } catch (e: unknown) {
    onError(e as Error);
  }
}

export function sendSubscriptionToServer(subscription: PushSubscription) {
  const url = `/api/subscription`
  const subscriptionObject = {
    endpoint: subscription.endpoint,
    keys: {
      p256dh: subscription.toJSON().keys?.p256dh,
      auth: subscription.toJSON().keys?.auth,
    },
  };

  console.log("sending this subscription object to server: ", subscriptionObject)

  fetch(url, {
    method: "POST",
    body: JSON.stringify(subscriptionObject),
    credentials: "include"
  }).
    then(resp => {
      if (resp.status != 200) {
        resp.text().then(t => {console.error("unable to send push subscription " + t)})
      }
    }).
    catch(e => {
      console.error(e)
    })

}