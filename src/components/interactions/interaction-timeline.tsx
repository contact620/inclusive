import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { InteractionItem } from "./interaction-item";
import type { InteractionWithUser } from "@/types";

interface InteractionTimelineProps {
  interactions: InteractionWithUser[];
  clientId: string;
}

export function InteractionTimeline({ interactions }: InteractionTimelineProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Historique des interactions</CardTitle>
      </CardHeader>
      <CardContent>
        {interactions.length === 0 ? (
          <p className="text-sm text-gray-500">Aucune interaction enregistrée</p>
        ) : (
          <div>
            {interactions.map((interaction) => (
              <InteractionItem
                key={interaction.id}
                type={interaction.type}
                title={interaction.title}
                description={interaction.description}
                occurredAt={interaction.occurred_at}
                userName={interaction.profiles?.full_name}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
