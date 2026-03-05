export const CLIENT_STATUSES = {
  lead: { label: "Prospect", color: "bg-blue-100 text-blue-800" },
  active: { label: "Actif", color: "bg-green-100 text-green-800" },
  inactive: { label: "Inactif", color: "bg-gray-100 text-gray-800" },
  archived: { label: "Archivé", color: "bg-red-100 text-red-800" },
} as const;

export const INTERACTION_TYPES = {
  note: { label: "Note", icon: "📝", color: "bg-yellow-100 text-yellow-800" },
  meeting: { label: "Réunion", icon: "👥", color: "bg-purple-100 text-purple-800" },
  call: { label: "Appel", icon: "📞", color: "bg-blue-100 text-blue-800" },
  email: { label: "Email", icon: "✉️", color: "bg-green-100 text-green-800" },
} as const;

export const ROLES = {
  admin: "Administrateur",
  user: "Utilisateur",
} as const;

export type ClientStatus = keyof typeof CLIENT_STATUSES;
export type InteractionType = keyof typeof INTERACTION_TYPES;
export type UserRole = keyof typeof ROLES;
