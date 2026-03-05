"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { ClientStatus } from "@/types";

interface GetClientsParams {
  search?: string;
  status?: ClientStatus;
  page?: number;
  perPage?: number;
}

export async function getClients({
  search,
  status,
  page = 1,
  perPage = 10,
}: GetClientsParams = {}) {
  const supabase = await createClient();
  const from = (page - 1) * perPage;
  const to = from + perPage - 1;

  let query = supabase
    .from("clients")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (search) {
    query = query.ilike("name", `%${search}%`);
  }

  if (status) {
    query = query.eq("status", status);
  }

  const { data, count, error } = await query;

  if (error) throw error;

  return {
    clients: data ?? [],
    total: count ?? 0,
    page,
    perPage,
    totalPages: Math.ceil((count ?? 0) / perPage),
  };
}

export async function getClientById(id: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data;
}

export async function createClientAction(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const clientData = {
    name: formData.get("name") as string,
    email: (formData.get("email") as string) || null,
    phone: (formData.get("phone") as string) || null,
    company: (formData.get("company") as string) || null,
    address: (formData.get("address") as string) || null,
    notes: (formData.get("notes") as string) || null,
    status: (formData.get("status") as ClientStatus) || "lead",
    created_by: user.id,
  };

  const { data, error } = await supabase
    .from("clients")
    .insert(clientData)
    .select()
    .single();

  if (error) return { error: error.message };

  // Log activity
  await supabase.from("activity_log").insert({
    user_id: user.id,
    action: "client_created",
    entity_type: "client",
    entity_id: data.id,
    metadata: { client_name: data.name },
  });

  revalidatePath("/clients");
  revalidatePath("/dashboard");
  redirect(`/clients/${data.id}`);
}

export async function updateClientAction(id: string, formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const clientData = {
    name: formData.get("name") as string,
    email: (formData.get("email") as string) || null,
    phone: (formData.get("phone") as string) || null,
    company: (formData.get("company") as string) || null,
    address: (formData.get("address") as string) || null,
    notes: (formData.get("notes") as string) || null,
    status: formData.get("status") as ClientStatus,
  };

  const { error } = await supabase
    .from("clients")
    .update(clientData)
    .eq("id", id);

  if (error) return { error: error.message };

  // Log activity
  await supabase.from("activity_log").insert({
    user_id: user.id,
    action: "client_updated",
    entity_type: "client",
    entity_id: id,
    metadata: { client_name: clientData.name },
  });

  revalidatePath("/clients");
  revalidatePath(`/clients/${id}`);
  revalidatePath("/dashboard");
  redirect(`/clients/${id}`);
}

export async function deleteClientAction(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("Non authentifié");

  const { error } = await supabase.from("clients").delete().eq("id", id);

  if (error) return { error: error.message };

  // Log activity
  await supabase.from("activity_log").insert({
    user_id: user.id,
    action: "client_deleted",
    entity_type: "client",
    entity_id: id,
    metadata: {},
  });

  revalidatePath("/clients");
  revalidatePath("/dashboard");
  redirect("/clients");
}
