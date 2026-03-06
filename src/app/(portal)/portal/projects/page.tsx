import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { mockProjects } from "@/lib/mock-portal";
import { PROJECT_TYPES, PROJECT_STAGES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";
import Link from "next/link";
import type { ProjectType } from "@/types";

export default function ProjectsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mes projets</h1>

      <div className="space-y-4">
        {mockProjects.map((project) => {
          const typeConfig = PROJECT_TYPES[project.type as ProjectType];
          const stageIndex = PROJECT_STAGES.findIndex(
            (s) => s.key === project.current_stage
          );
          const progress = Math.round(
            ((stageIndex + 1) / PROJECT_STAGES.length) * 100
          );
          const stageConfig = PROJECT_STAGES[stageIndex];

          return (
            <Link key={project.id} href={`/portal/projects/${project.id}`}>
              <Card className="transition-shadow hover:shadow-md">
                <CardContent>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xl">{typeConfig.icon}</span>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {project.title}
                        </h3>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {project.property_address}
                      </p>
                      {project.property_price && (
                        <p className="mt-1 text-lg font-semibold text-blue-600">
                          {project.property_price.toLocaleString("fr-FR")} €
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={typeConfig.color}>{typeConfig.label}</Badge>
                      <div className="flex items-center gap-2">
                        <Avatar
                          name={project.agent.full_name}
                          size="sm"
                        />
                        <span className="text-sm text-gray-600">
                          {project.agent.full_name}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="flex items-center gap-1 font-medium text-gray-700">
                        {stageConfig?.icon} {stageConfig?.label}
                      </span>
                      <span className="text-gray-500">{progress}%</span>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
                      <div
                        className="h-full rounded-full bg-blue-500 transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <p className="mt-3 text-xs text-gray-400">
                    Mis à jour le {formatDate(project.updated_at)}
                  </p>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
