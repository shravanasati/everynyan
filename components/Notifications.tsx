import { NotificationType } from "@/lib/firebase/notifications"
import Link from "next/link"

type IndividualNotification = NotificationType & {
  timestamp: string
}

type NotificationsProps = {
  notifs: IndividualNotification[]
}

export function Notifications({ notifs }: NotificationsProps) {
  return (
    <div className="w-full max-w-[60vw] mx-auto bg-white shadow-lg rounded-lg overflow-hidden m-2">
      <div className="bg-primary text-white px-4 py-2 flex justify-center">
        <h2 className="text-3xl font-semibold">Notifications</h2>
      </div>
      {notifs.length === 0 && (
        <div className="p-4 text-gray-500 text-center">
          No notifications yet
        </div>
      )}
      <ul className="divide-y divide-gray-200">
        {notifs.map((notif, index) => (
          <li
            key={index}
            className={`p-4 hover:bg-gray-50 transition-colors duration-150 ease-in-out ${notif.status === 'unread' ? 'bg-secondary bg-opacity-10' : ''
              }`}
          >
            <Link href={notif.link}>
              <div className="flex items-center space-x-4">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {notif.title}
                  </p>
                  <p className="text-sm text-gray-500 truncate">
                    {notif.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {notif.timestamp}
                  </p>
                </div>
                {notif.status === 'unread' && (
                  <div className="flex-shrink-0">
                    <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                  </div>
                )}
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

