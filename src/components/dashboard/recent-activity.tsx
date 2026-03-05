import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import type { ActivityLogWithUser } from "@/types";

interface RecentActivityProps {
  activities: ActivityLogWithUser[];
}

const ACTION_LABELS: Record<string, string> = {
  client_created: "a créé le client",
  client_updated: "a mis à jour le client",
  client_deleted: "a supprimé un client",
  interaction_created: "a ajouté une interaction",
};

export function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Activité récente</CardTitle>
      </CardHeader>
      <CardContent>
        {activities.length === 0 ? (
          <p className="text-sm text-gray-500">Aucune activité récente</p>
        ) : (
          <div className="space-y-3">
            {activities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 rounded-full bg-blue-500" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">
                    <span className="font-medium">
                      {activity.profiles?.full_name || "Utilisateur"}
                    </span>{" "}
                    {ACTION_LABELS[activity.action] || activity.action}
                    {(activity.metadata as Record<string, string>)?.client_name && (
                      <span className="font-medium">
                        {" "}
                        {(activity.metadata as Record<string, string>).client_name}
                      </span>
                    )}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDateTime(activity.created_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
