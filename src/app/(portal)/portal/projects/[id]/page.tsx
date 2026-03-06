import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { ProjectStageTracker } from "@/components/portal/project-stage-tracker";
import { mockProjects, mockDocuments } from "@/lib/mock-portal";
import { PROJECT_TYPES, DOCUMENT_TYPES } from "@/lib/constants";
import { formatDate, formatDateTime } from "@/lib/utils";
import { formatFileSize } from "@/lib/mock-portal";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { ProjectType, DocumentType } from "@/types";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: Props) {
  const { id } = await params;
  const project = mockProjects.find((p) => p.id === id);

  if (!project) notFound();

  const typeConfig = PROJECT_TYPES[project.type as ProjectType];
  const projectDocs = mockDocuments.filter((d) => d.project_id === id);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Link
          href="/portal/projects"
          className="mb-2 inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
        >
          ← Retour aux projets
        </Link>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{typeConfig.icon}</span>
              <h1 className="text-2xl font-bold text-gray-900">{project.title}</h1>
            </div>
            <p className="mt-1 text-gray-600">{project.property_address}</p>
          </div>
          <Badge className={typeConfig.color + " text-sm px-3 py-1"}>
            {typeConfig.label}
          </Badge>
        </div>
      </div>

      {/* Stage tracker */}
      <Card>
        <CardHeader>
          <CardTitle>Avancement du projet</CardTitle>
        </CardHeader>
        <CardContent>
          <ProjectStageTracker currentStage={project.current_stage} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Project details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Détails du bien</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-sm font-medium text-gray-500">Adresse</p>
                  <p className="mt-0.5 text-sm text-gray-900">
                    {project.property_address || "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Prix</p>
                  <p className="mt-0.5 text-lg font-semibold text-blue-600">
                    {project.property_price
                      ? project.property_price.toLocaleString("fr-FR") + " €"
                      : "—"}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Type</p>
                  <p className="mt-0.5 text-sm text-gray-900">{typeConfig.label}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Date de création</p>
                  <p className="mt-0.5 text-sm text-gray-900">
                    {formatDate(project.created_at)}
                  </p>
                </div>
              </div>
              {project.description && (
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="mt-1 text-sm text-gray-900">{project.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Documents */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Documents ({projectDocs.length})</CardTitle>
                <Link
                  href="/portal/documents"
                  className="text-sm text-blue-600 hover:underline"
                >
                  Gérer les documents
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              {projectDocs.length === 0 ? (
                <p className="text-sm text-gray-500">Aucun document</p>
              ) : (
                <div className="divide-y divide-gray-100">
                  {projectDocs.map((doc) => {
                    const docType = DOCUMENT_TYPES[doc.type as DocumentType];
                    return (
                      <div key={doc.id} className="flex items-center gap-3 py-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-lg">
                          {docType.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-gray-900">
                            {doc.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatFileSize(doc.file_size)} • {formatDateTime(doc.created_at)}
                          </p>
                        </div>
                        <Badge
                          className={
                            doc.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : doc.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }
                        >
                          {doc.status === "approved"
                            ? "Validé"
                            : doc.status === "pending"
                            ? "En attente"
                            : "Rejeté"}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Agent info */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Votre agent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center">
                <Avatar name={project.agent.full_name} size="lg" />
                <p className="mt-3 font-semibold text-gray-900">
                  {project.agent.full_name}
                </p>
                <p className="text-sm text-gray-500">Agent immobilier</p>
                <div className="mt-4 w-full space-y-2">
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    Appeler
                  </button>
                  <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    Envoyer un email
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
