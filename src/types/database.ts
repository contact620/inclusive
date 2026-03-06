export type ClientStatus = "lead" | "active" | "inactive" | "archived";
export type InteractionType = "note" | "meeting" | "call" | "email" | "visit";
export type UserRole = "admin" | "agent" | "client";
export type ProjectType = "purchase" | "sale" | "rental" | "management";
export type ProjectStage = "search" | "visits" | "offer" | "compromise" | "financing" | "deed" | "handover";
export type DocumentType = "identity" | "income" | "property" | "contract" | "diagnostic" | "insurance" | "other";
export type NotificationType = "project_update" | "document_request" | "document_signed" | "appointment" | "message";

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

export interface Project {
  id: string;
  client_id: string;
  agent_id: string;
  title: string;
  type: ProjectType;
  current_stage: ProjectStage;
  property_address: string | null;
  property_price: number | null;
  description: string | null;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  project_id: string;
  uploaded_by: string;
  name: string;
  type: DocumentType;
  file_url: string;
  file_size: number;
  status: "pending" | "approved" | "rejected";
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  link: string | null;
  created_at: string;
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
export interface ProjectWithAgent extends Project {
  agent: Pick<Profile, "id" | "full_name" | "avatar_url"> | null;
}

export interface DocumentWithUploader extends Document {
  uploader: Pick<Profile, "id" | "full_name"> | null;
}

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
