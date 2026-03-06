"use client";

import { useEffect, useState } from "react";
import type { Profile } from "@/types";

const DEMO_MODE =
  !process.env.NEXT_PUBLIC_SUPABASE_URL ||
  process.env.NEXT_PUBLIC_SUPABASE_URL === "your_supabase_url_here";

const mockProfile: Profile = {
  id: "demo-user-001",
  full_name: "Franck Orsi",
  avatar_url: null,
  role: "admin",
  created_at: "2025-01-15T10:00:00Z",
  updated_at: "2025-03-01T10:00:00Z",
};

export function useUser() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (DEMO_MODE) {
      setProfile(mockProfile);
      setLoading(false);
      return;
    }

    async function getProfile() {
      const { createClient } = await import("@/lib/supabase/client");
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        setProfile(data);
      }
      setLoading(false);

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        if (!session) {
          setProfile(null);
        }
      });

      return () => subscription.unsubscribe();
    }

    getProfile();
  }, []);

  return { profile, loading };
}
