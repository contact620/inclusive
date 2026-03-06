"use client";

import { useState } from "react";
import { useUser } from "@/hooks/use-user";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ROLES } from "@/lib/constants";

const DEMO_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url_here";

export default function SettingsPage() {
  const { profile } = useUser();
  const [fullName, setFullName] = useState(profile?.full_name ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleUpdateProfile() {
    if (!profile) return;
    setLoading(true);
    setMessage(null);

    if (DEMO_MODE) {
      setMessage("Mode démo : profil mis à jour (simulation)");
      setLoading(false);
      return;
    }

    const { createClient } = await import("@/lib/supabase/client");
    const supabase = createClient();

    const { error } = await supabase
      .from("profiles")
      .update({ full_name: fullName })
      .eq("id", profile.id);

    if (error) {
      setMessage("Erreur: " + error.message);
    } else {
      setMessage("Profil mis à jour avec succès");
    }
    setLoading(false);
  }

  if (!profile) return null;

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>

      <Card>
        <CardHeader>
          <CardTitle>Mon profil</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">Rôle:</span>
              <Badge className="bg-blue-100 text-blue-800">
                {ROLES[profile.role as keyof typeof ROLES]}
              </Badge>
            </div>

            <Input
              id="full_name"
              label="Nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />

            {message && (
              <p
                className={`text-sm ${
                  message.startsWith("Erreur") ? "text-red-600" : "text-green-600"
                }`}
              >
                {message}
              </p>
            )}

            <Button onClick={handleUpdateProfile} disabled={loading}>
              {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
