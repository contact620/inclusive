"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { mockClientProfile } from "@/lib/mock-portal";

export default function ProfilePage() {
  const [fullName, setFullName] = useState(mockClientProfile.full_name ?? "");
  const [message, setMessage] = useState<string | null>(null);

  function handleSave() {
    setMessage("Mode démo : profil mis à jour (simulation)");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Mon profil</h1>

      <Card>
        <CardHeader>
          <CardTitle>Informations personnelles</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Avatar name={mockClientProfile.full_name ?? ""} size="lg" />
              <div>
                <p className="font-semibold text-gray-900">
                  {mockClientProfile.full_name}
                </p>
                <p className="text-sm text-gray-500">Client</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="full_name"
                label="Nom complet"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
              <Input
                id="email"
                label="Email"
                type="email"
                defaultValue="sophie.martin@email.com"
                disabled
              />
              <Input
                id="phone"
                label="Téléphone"
                defaultValue="+33 6 12 34 56 78"
              />
              <Input
                id="address"
                label="Adresse"
                defaultValue="28 Rue de Rivoli, 75004 Paris"
              />
            </div>

            {message && (
              <p className="text-sm text-green-600">{message}</p>
            )}

            <Button onClick={handleSave}>Enregistrer</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sécurité</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Input
                id="current_password"
                label="Mot de passe actuel"
                type="password"
                placeholder="••••••••"
              />
              <Input
                id="new_password"
                label="Nouveau mot de passe"
                type="password"
                placeholder="••••••••"
              />
            </div>
            <Button variant="secondary">Changer le mot de passe</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
