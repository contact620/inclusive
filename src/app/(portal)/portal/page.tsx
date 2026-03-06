import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProjects, mockDocuments, mockNotifications } from "@/lib/mock-portal";
import { PROJECT_TYPES, PROJECT_STAGES } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import type { ProjectType, ProjectStage } from "@/types";

export default function PortalHomePage() {
  const unreadNotifs = mockNotifications.filter((n) => !n.read);
  const pendingDocs = mockDocuments.filter((d) => d.status === "pending");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Bonjour, Sophie
        </h1>
        <p className="mt-1 text-gray-600">
          Bienvenue sur votre espace client Inclusive
        </p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-xl">
              🏠
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{mockProjects.length}</p>
              <p className="text-sm text-gray-500">Projets en cours</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50 text-xl">
              📄
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{pendingDocs.length}</p>
              <p className="text-sm text-gray-500">Documents en attente</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50 text-xl">
              🔔
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{unreadNotifs.length}</p>
              <p className="text-sm text-gray-500">Notifications non lues</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Projects summary */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Mes projets</CardTitle>
              <Link href="/portal/projects" className="text-sm text-blue-600 hover:underline">
                Voir tout
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.map((project) => {
                const typeConfig = PROJECT_TYPES[project.type as ProjectType];
                const stageConfig = PROJECT_STAGES.find(
                  (s) => s.key === project.current_stage
                );
                return (
                  <Link
                    key={project.id}
                    href={`/portal/projects/${project.id}`}
                    className="block rounded-lg border border-gray-100 p-3 transition-colors hover:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{typeConfig.icon}</span>
                        <span className="font-medium text-gray-900">{project.title}</span>
                      </div>
                      <Badge className={typeConfig.color}>{typeConfig.label}</Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <span>{stageConfig?.icon}</span>
                      <span>Étape : {stageConfig?.label}</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent notifications */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Dernières notifications</CardTitle>
              <Link href="/portal/notifications" className="text-sm text-blue-600 hover:underline">
                Voir tout
              </Link>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockNotifications.slice(0, 4).map((notif) => (
                <div
                  key={notif.id}
                  className={`rounded-lg p-3 ${
                    notif.read ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {!notif.read && (
                      <div className="mt-1.5 h-2 w-2 flex-shrink-0 rounded-full bg-blue-500" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{notif.title}</p>
                      <p className="mt-0.5 text-sm text-gray-600 line-clamp-2">
                        {notif.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-400">
                        {formatDateTime(notif.created_at)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
