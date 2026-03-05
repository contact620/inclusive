"use client";

import { useState } from "react";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { deleteClientAction } from "@/actions/clients";

interface DeleteClientDialogProps {
  clientId: string;
  clientName: string;
  open: boolean;
  onClose: () => void;
}

export function DeleteClientDialog({
  clientId,
  clientName,
  open,
  onClose,
}: DeleteClientDialogProps) {
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    setLoading(true);
    const result = await deleteClientAction(clientId);
    if (result?.error) {
      alert(result.error);
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <h3 className="text-lg font-semibold text-gray-900">Supprimer le client</h3>
      <p className="mt-2 text-sm text-gray-600">
        Êtes-vous sûr de vouloir supprimer <strong>{clientName}</strong> ? Cette
        action est irréversible et supprimera toutes les interactions associées.
      </p>
      <div className="mt-4 flex justify-end gap-3">
        <Button variant="secondary" onClick={onClose} disabled={loading}>
          Annuler
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={loading}>
          {loading ? "Suppression..." : "Supprimer"}
        </Button>
      </div>
    </Dialog>
  );
}
