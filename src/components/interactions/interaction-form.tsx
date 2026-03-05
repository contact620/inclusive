"use client";

import { useState } from "react";
import { createInteractionAction } from "@/actions/interactions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { INTERACTION_TYPES } from "@/lib/constants";

interface InteractionFormProps {
  clientId: string;
}

const typeOptions = Object.entries(INTERACTION_TYPES).map(([value, config]) => ({
  value,
  label: config.label,
}));

export function InteractionForm({ clientId }: InteractionFormProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);

    formData.set("client_id", clientId);

    const result = await createInteractionAction(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setKey((k) => k + 1); // reset form
    }
    setLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Nouvelle interaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form key={key} action={handleSubmit} className="space-y-3">
          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <Select
            id="type"
            name="type"
            label="Type"
            options={typeOptions}
          />

          <Input
            id="title"
            name="title"
            label="Titre *"
            placeholder="Objet de l'interaction"
            required
          />

          <Textarea
            id="description"
            name="description"
            label="Description"
            placeholder="Détails..."
          />

          <Input
            id="occurred_at"
            name="occurred_at"
            type="datetime-local"
            label="Date"
            defaultValue={new Date().toISOString().slice(0, 16)}
          />

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Ajout..." : "Ajouter"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
