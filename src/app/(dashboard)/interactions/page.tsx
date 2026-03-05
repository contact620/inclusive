import { getAllInteractions } from "@/actions/interactions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INTERACTION_TYPES } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import Link from "next/link";
import type { InteractionType } from "@/types";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function InteractionsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = params.page ? parseInt(params.page) : 1;
  const { interactions } = await getAllInteractions(page);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Interactions</h1>

      <Card>
        <CardHeader>
          <CardTitle>Toutes les interactions</CardTitle>
        </CardHeader>
        <CardContent>
          {interactions.length === 0 ? (
            <p className="text-sm text-gray-500">Aucune interaction</p>
          ) : (
            <div className="divide-y divide-gray-100">
              {interactions.map((interaction) => {
                const config = INTERACTION_TYPES[interaction.type as InteractionType];
                return (
                  <div key={interaction.id} className="flex items-start gap-3 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm">
                      {config.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge className={config.color}>{config.label}</Badge>
                        <span className="text-xs text-gray-500">
                          {formatDateTime(interaction.occurred_at)}
                        </span>
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {interaction.title}
                      </p>
                      {interaction.description && (
                        <p className="mt-0.5 text-sm text-gray-600">
                          {interaction.description}
                        </p>
                      )}
                      {interaction.clients && (
                        <Link
                          href={`/clients/${interaction.clients.id}`}
                          className="mt-1 inline-block text-xs text-blue-600 hover:underline"
                        >
                          {interaction.clients.name}
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
