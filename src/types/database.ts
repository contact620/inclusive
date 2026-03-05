export type ClientStatus = "lead" | "active" | "inactive" | "archived";
export type InteractionType = "note" | "meeting" | "call" | "email";
export type UserRole = "admin" | "user";

export interface Profile {
  id: string;
  full_name: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  address: string | null;
  notes: string | null;
  status: ClientStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface Interaction {
  id: string;
  client_id: string;
  user_id: string;
  type: InteractionType;
  title: string;
  description: string | null;
  occurred_at: string;
  created_at: string;
}

export interface ActivityLog {
  id: string;
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  metadata: Record<string, unknown>;
  created_at: string;
}

// Extended types with relations
export interface ClientWithInteractions extends Client {
  interactions: Interaction[];
}

export interface InteractionWithClient extends Interaction {
  clients: Pick<Client, "id" | "name"> | null;
}

export interface InteractionWithUser extends Interaction {
  profiles: Pick<Profile, "id" | "full_name"> | null;
}

export interface ActivityLogWithUser extends ActivityLog {
  profiles: Pick<Profile, "id" | "full_name"> | null;
}
