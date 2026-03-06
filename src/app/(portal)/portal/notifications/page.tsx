import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockNotifications } from "@/lib/mock-portal";
import { NOTIFICATION_TYPES } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import type { NotificationType } from "@/types";

export default function NotificationsPage() {
  const unread = mockNotifications.filter((n) => !n.read);
  const read = mockNotifications.filter((n) => n.read);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        {unread.length > 0 && (
          <button className="text-sm text-blue-600 hover:underline">
            Tout marquer comme lu
          </button>
        )}
      </div>

      {unread.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Non lues ({unread.length})
          </h2>
          <div className="space-y-2">
            {unread.map((notif) => (
              <NotificationCard key={notif.id} notification={notif} />
            ))}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div>
          <h2 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Lues
          </h2>
          <div className="space-y-2">
            {read.map((notif) => (
              <NotificationCard key={notif.id} notification={notif} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationCard({
  notification,
}: {
  notification: (typeof mockNotifications)[0];
}) {
  const config = NOTIFICATION_TYPES[notification.type as NotificationType];

  const content = (
    <Card
      className={`transition-colors ${
        !notification.read
          ? "border-blue-200 bg-blue-50/50 hover:bg-blue-50"
          : "hover:bg-gray-50"
      }`}
    >
      <CardContent>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-100 text-lg">
            {config.icon}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-semibold text-gray-900">
                {notification.title}
              </p>
              {!notification.read && (
                <div className="h-2 w-2 rounded-full bg-blue-500" />
              )}
            </div>
            <p className="mt-1 text-sm text-gray-600">{notification.message}</p>
            <p className="mt-2 text-xs text-gray-400">
              {formatDateTime(notification.created_at)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (notification.link) {
    return <Link href={notification.link}>{content}</Link>;
  }

  return content;
}
