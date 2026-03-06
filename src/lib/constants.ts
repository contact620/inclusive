// === Statuts des clients ===
export const CLIENT_STATUSES = {
  lead: { label: "Prospect", color: "bg-blue-100 text-blue-800" },
  active: { label: "Actif", color: "bg-green-100 text-green-800" },
  inactive: { label: "Inactif", color: "bg-gray-100 text-gray-800" },
  archived: { label: "Archivé", color: "bg-red-100 text-red-800" },
} as const;

// === Types d'interactions (vue équipe) ===
export const INTERACTION_TYPES = {
  note: { label: "Note", icon: "📝", color: "bg-yellow-100 text-yellow-800" },
  meeting: { label: "Rendez-vous", icon: "👥", color: "bg-purple-100 text-purple-800" },
  call: { label: "Appel", icon: "📞", color: "bg-blue-100 text-blue-800" },
  email: { label: "Email", icon: "✉️", color: "bg-green-100 text-green-800" },
  visit: { label: "Visite", icon: "🏠", color: "bg-orange-100 text-orange-800" },
} as const;

// === Types de projets immobiliers ===
export const PROJECT_TYPES = {
  purchase: { label: "Achat", icon: "🏠", color: "bg-blue-100 text-blue-800" },
  sale: { label: "Vente", icon: "💰", color: "bg-green-100 text-green-800" },
  rental: { label: "Location", icon: "🔑", color: "bg-purple-100 text-purple-800" },
  management: { label: "Gestion", icon: "📋", color: "bg-orange-100 text-orange-800" },
} as const;

// === Étapes d'un projet immobilier ===
export const PROJECT_STAGES = [
  { key: "search", label: "Recherche", icon: "🔍" },
  { key: "visits", label: "Visites", icon: "🏠" },
  { key: "offer", label: "Offre", icon: "📝" },
  { key: "compromise", label: "Compromis", icon: "🤝" },
  { key: "financing", label: "Financement", icon: "🏦" },
  { key: "deed", label: "Acte authentique", icon: "📜" },
  { key: "handover", label: "Remise des clés", icon: "🔑" },
] as const;

// === Types de documents ===
export const DOCUMENT_TYPES = {
  identity: { label: "Pièce d'identité", icon: "🪪" },
  income: { label: "Justificatif de revenus", icon: "💰" },
  property: { label: "Document de propriété", icon: "🏠" },
  contract: { label: "Contrat", icon: "📄" },
  diagnostic: { label: "Diagnostic", icon: "🔍" },
  insurance: { label: "Assurance", icon: "🛡️" },
  other: { label: "Autre", icon: "📎" },
} as const;

// === Rôles ===
export const ROLES = {
  admin: "Administrateur",
  agent: "Agent",
  client: "Client",
} as const;

// === Notifications ===
export const NOTIFICATION_TYPES = {
  project_update: { label: "Mise à jour projet", icon: "📊" },
  document_request: { label: "Document demandé", icon: "📄" },
  document_signed: { label: "Document signé", icon: "✅" },
  appointment: { label: "Rendez-vous", icon: "📅" },
  message: { label: "Message", icon: "💬" },
} as const;

export type ClientStatus = keyof typeof CLIENT_STATUSES;
export type InteractionType = keyof typeof INTERACTION_TYPES;
export type ProjectType = keyof typeof PROJECT_TYPES;
export type ProjectStage = (typeof PROJECT_STAGES)[number]["key"];
export type DocumentType = keyof typeof DOCUMENT_TYPES;
export type UserRole = keyof typeof ROLES;
export type NotificationType = keyof typeof NOTIFICATION_TYPES;
