export interface Office {
  id: string;
  title: string;
  address: string;
  district: string;
  lat: number;
  lng: number;
  type: "commercial" | "coworking" | "meeting_room";
  leaseType: "bail_commercial" | "bail_precaire" | "coworking" | "sous_location";
  transactionType: "location" | "vente";
  priceMonthly: number;
  pricePerSqmYear: number;
  surface: number;
  seats: number;
  floor: string;
  availability: "immediate" | "after_agreement" | string;
  leaseDuration: string;
  offMarket: boolean;
  images: string[];
  updatedAt: string;
}

export interface Filters {
  location: string;
  type: Office["type"] | "";
  transactionType: Office["transactionType"] | "";
  leaseType: Office["leaseType"] | "";
  seatsMin: number;
  seatsMax: number;
  budgetMax: number;
}

export const DEFAULT_FILTERS: Filters = {
  location: "",
  type: "",
  transactionType: "",
  leaseType: "",
  seatsMin: 0,
  seatsMax: 200,
  budgetMax: 50000,
};

export const TYPE_LABELS: Record<Office["type"], string> = {
  commercial: "Bureaux",
  coworking: "Coworking",
  meeting_room: "Salle de réunion",
};

export const LEASE_LABELS: Record<Office["leaseType"], { label: string; color: string }> = {
  bail_commercial: { label: "Bail Commercial", color: "bg-blue-100 text-blue-700" },
  bail_precaire: { label: "Bail Précaire", color: "bg-amber-100 text-amber-700" },
  coworking: { label: "Coworking", color: "bg-emerald-100 text-emerald-700" },
  sous_location: { label: "Sous-location", color: "bg-purple-100 text-purple-700" },
};

export const TRANSACTION_LABELS: Record<Office["transactionType"], string> = {
  location: "Location",
  vente: "Vente",
};
