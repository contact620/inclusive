"use server";

import { revalidatePath } from "next/cache";
import { DEMO_MODE, mockInteractions } from "@/lib/mock-data";
import type { InteractionType } from "@/types";

export async function getInteractionsByClient(clientId: string) {
  if (DEMO_MODE) {
    return mockInteractions.filter((i) => i.client_id === clientId);
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("interactions")
    .select("*, profiles(id, full_name)")
    .eq("client_id", clientId)
    .order("occurred_at", { ascending: false });

  if (error) throw error;
  return data ?? [];
}

export async function getAllInteractions(page: number = 1, perPage: number = 20) {
  if (DEMO_MODE) {
    const sorted = [...mockInteractions].sort(
      (a, b) => new Date(b.occurred_at).getTime() - new Date(a.occurred_at).getTime()
    );
    const from = (page - 1) * perPage;
    const paged = sorted.slice(from, from + perPage);
    return {
      interactions: paged,
      total: sorted.length,
      totalPages: Math.ceil(sorted.length / perPage),
    };
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  const { data, count, error } = await supabase
    .from("interactions")
    .select("*, clients(id, name), profiles(id, full_name)", { count: "exact" })
    .order("occurred_at", { ascending: false })
    .range(from, to);

  if (error) throw error;

  return {
    interactions: data ?? [],
    total: count ?? 0,
    totalPages: Math.ceil((count ?? 0) / perPage),
  };
}

export async function createInteractionAction(formData: FormData) {
  if (DEMO_MODE) {
    return { success: true };
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const clientId = formData.get("client_id") as string;

  const interactionData = {
    client_id: clientId,
    user_id: user.id,
    type: formData.get("type") as InteractionType,
    title: formData.get("title") as string,
    description: (formData.get("description") as string) || null,
    occurred_at: (formData.get("occurred_at") as string) || new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("interactions")
    .insert(interactionData)
    .select()
    .single();

  if (error) return { error: error.message };

  await supabase.from("activity_log").insert({
    user_id: user.id,
    action: "interaction_created",
    entity_type: "interaction",
    entity_id: data.id,
    metadata: { type: data.type, title: data.title, client_id: clientId },
  });

  revalidatePath(`/clients/${clientId}`);
  revalidatePath("/interactions");
  revalidatePath("/dashboard");

  return { success: true };
}

export async function deleteInteractionAction(id: string, clientId: string) {
  if (DEMO_MODE) {
    return { success: true };
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const { error } = await supabase.from("interactions").delete().eq("id", id);

  if (error) return { error: error.message };

  revalidatePath(`/clients/${clientId}`);
  revalidatePath("/interactions");
  revalidatePath("/dashboard");

  return { success: true };
}
