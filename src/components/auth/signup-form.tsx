"use client";

import { useState } from "react";
import { signup } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    setError(null);
    const result = await signup(formData);
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
        id="full_name"
        name="full_name"
        type="text"
        label="Nom complet"
        placeholder="Jean Dupont"
        required
      />

      <Input
        id="email"
        name="email"
        type="email"
        label="Email"
        placeholder="vous@exemple.com"
        required
      />

      <Input
        id="password"
        name="password"
        type="password"
        label="Mot de passe"
        placeholder="••••••••"
        minLength={6}
        required
      />

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Inscription..." : "S'inscrire"}
      </Button>

      <p className="text-center text-sm text-gray-600">
        Déjà un compte ?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
          Se connecter
        </Link>
      </p>
    </form>
  );
}
