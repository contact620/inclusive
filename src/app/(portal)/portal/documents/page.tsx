import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { mockDocuments, mockProjects, formatFileSize } from "@/lib/mock-portal";
import { DOCUMENT_TYPES } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import type { DocumentType } from "@/types";

export default function DocumentsPage() {
  const groupedByProject = mockProjects.map((project) => ({
    project,
    documents: mockDocuments.filter((d) => d.project_id === project.id),
  }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mes documents</h1>
        <Button>
          <span className="mr-2">📤</span> Déposer un document
        </Button>
      </div>

      {groupedByProject.map(({ project, documents }) => (
        <Card key={project.id}>
          <CardHeader>
            <CardTitle>
              {project.title}
              <span className="ml-2 text-sm font-normal text-gray-500">
                ({documents.length} document{documents.length > 1 ? "s" : ""})
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="pb-3 font-medium text-gray-500">Document</th>
                    <th className="hidden pb-3 font-medium text-gray-500 sm:table-cell">Type</th>
                    <th className="hidden pb-3 font-medium text-gray-500 md:table-cell">Taille</th>
                    <th className="hidden pb-3 font-medium text-gray-500 md:table-cell">Date</th>
                    <th className="pb-3 font-medium text-gray-500">Statut</th>
                    <th className="pb-3 font-medium text-gray-500"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {documents.map((doc) => {
                    const docType = DOCUMENT_TYPES[doc.type as DocumentType];
                    return (
                      <tr key={doc.id} className="hover:bg-gray-50">
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{docType.icon}</span>
                            <span className="font-medium text-gray-900 truncate max-w-[200px]">
                              {doc.name}
                            </span>
                          </div>
                        </td>
                        <td className="hidden py-3 text-gray-600 sm:table-cell">
                          {docType.label}
                        </td>
                        <td className="hidden py-3 text-gray-600 md:table-cell">
                          {formatFileSize(doc.file_size)}
                        </td>
                        <td className="hidden py-3 text-gray-600 md:table-cell">
                          {formatDateTime(doc.created_at)}
                        </td>
                        <td className="py-3">
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
                        </td>
                        <td className="py-3">
                          <button className="text-blue-600 hover:underline text-sm">
                            Télécharger
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
