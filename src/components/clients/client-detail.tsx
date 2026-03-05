"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ClientStatusBadge } from "./client-status-badge";
import { DeleteClientDialog } from "./delete-client-dialog";
import { formatDate } from "@/lib/utils";
import type { Client } from "@/types";

interface ClientDetailProps {
  client: Client;
}

export function ClientDetail({ client }: ClientDetailProps) {
  const [showDelete, setShowDelete] = useState(false);

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-gray-900">{client.name}</h1>
            <ClientStatusBadge status={client.status} />
          </div>
          {client.company && (
            <p className="mt-1 text-gray-600">{client.company}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Link href={`/clients/${client.id}/edit`}>
            <Button variant="secondary">Modifier</Button>
          </Link>
          <Button variant="danger" onClick={() => setShowDelete(true)}>
            Supprimer
          </Button>
        </div>
      </div>

      <Card>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <InfoItem label="Email" value={client.email} />
          <InfoItem label="Téléphone" value={client.phone} />
          <InfoItem label="Adresse" value={client.address} />
          <InfoItem label="Créé le" value={formatDate(client.created_at)} />
          <InfoItem label="Mis à jour le" value={formatDate(client.updated_at)} />
        </div>
        {client.notes && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <p className="text-sm font-medium text-gray-700">Notes</p>
            <p className="mt-1 whitespace-pre-wrap text-sm text-gray-600">
              {client.notes}
            </p>
          </div>
        )}
      </Card>

      <DeleteClientDialog
        clientId={client.id}
        clientName={client.name}
        open={showDelete}
        onClose={() => setShowDelete(false)}
      />
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-0.5 text-sm text-gray-900">{value || "—"}</p>
    </div>
  );
}
