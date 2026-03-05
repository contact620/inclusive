import { getClientById } from "@/actions/clients";
import { getInteractionsByClient } from "@/actions/interactions";
import { ClientDetail } from "@/components/clients/client-detail";
import { InteractionTimeline } from "@/components/interactions/interaction-timeline";
import { InteractionForm } from "@/components/interactions/interaction-form";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function ClientDetailPage({ params }: Props) {
  const { id } = await params;

  let client;
  try {
    client = await getClientById(id);
  } catch {
    notFound();
  }

  const interactions = await getInteractionsByClient(id);

  return (
    <div className="space-y-6">
      <ClientDetail client={client} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <InteractionTimeline interactions={interactions} clientId={id} />
        </div>
        <div>
          <InteractionForm clientId={id} />
        </div>
      </div>
    </div>
  );
}
