"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { CLIENT_STATUSES } from "@/lib/constants";
import { createClientAction, updateClientAction } from "@/actions/clients";
import type { Client } from "@/types";

interface ClientFormProps {
  mode: "create" | "edit";
  defaultValues?: Client;
}

const statusOptions = Object.entries(CLIENT_STATUSES).map(([value, config]) => ({
  value,
  label: config.label,
}));

export function ClientForm({ mode, defaultValues }: ClientFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    let result;
    if (mode === "edit" && defaultValues) {
      result = await updateClientAction(defaultValues.id, formData);
    } else {
      result = await createClientAction(formData);
    }

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  }

  return (
    <form action={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <Input
        id="name"
        name="name"
        label="Nom *"
        placeholder="Nom du client"
        defaultValue={defaultValues?.name}
        required
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="email"
          name="email"
          type="email"
          label="Email"
          placeholder="client@exemple.com"
          defaultValue={defaultValues?.email ?? ""}
        />
        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Téléphone"
          placeholder="+33 6 12 34 56 78"
          defaultValue={defaultValues?.phone ?? ""}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Input
          id="company"
          name="company"
          label="Entreprise"
          placeholder="Nom de l'entreprise"
          defaultValue={defaultValues?.company ?? ""}
        />
        <Select
          id="status"
          name="status"
          label="Statut"
          options={statusOptions}
          defaultValue={defaultValues?.status ?? "lead"}
        />
      </div>

      <Input
        id="address"
        name="address"
        label="Adresse"
        placeholder="Adresse complète"
        defaultValue={defaultValues?.address ?? ""}
      />

      <Textarea
        id="notes"
        name="notes"
        label="Notes"
        placeholder="Notes additionnelles..."
        defaultValue={defaultValues?.notes ?? ""}
      />

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={loading}>
          {loading
            ? "Enregistrement..."
            : mode === "create"
            ? "Créer le client"
            : "Mettre à jour"}
        </Button>
        <Button type="button" variant="secondary" onClick={() => history.back()}>
          Annuler
        </Button>
      </div>
    </form>
  );
}
