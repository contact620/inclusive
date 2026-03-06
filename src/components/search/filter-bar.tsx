"use client";

import { cn } from "@/lib/utils";
import { TYPE_LABELS, LEASE_LABELS, TRANSACTION_LABELS, DEFAULT_FILTERS } from "@/lib/search-types";
import type { Filters, Office } from "@/lib/search-types";

interface FilterBarProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  resultCount: number;
}

export function FilterBar({ filters, onChange, resultCount }: FilterBarProps) {
  function update(patch: Partial<Filters>) {
    onChange({ ...filters, ...patch });
  }

  function reset() {
    onChange(DEFAULT_FILTERS);
  }

  return (
    <div className="sticky top-0 z-10 border-b border-gray-200 bg-white">
      <div className="flex flex-wrap items-center gap-2 px-4 py-3">
        {/* Location */}
        <div className="relative">
          <input
            type="text"
            placeholder="📍 Localisation"
            value={filters.location}
            onChange={(e) => update({ location: e.target.value })}
            className="h-9 w-44 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm placeholder:text-gray-400 focus:border-blue-400 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

        {/* Type */}
        <select
          value={filters.type}
          onChange={(e) => update({ type: e.target.value as Filters["type"] })}
          className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:border-blue-400 focus:outline-none"
        >
          <option value="">Type de bien</option>
          {Object.entries(TYPE_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Transaction */}
        <select
          value={filters.transactionType}
          onChange={(e) => update({ transactionType: e.target.value as Filters["transactionType"] })}
          className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:border-blue-400 focus:outline-none"
        >
          <option value="">Location / Vente</option>
          {Object.entries(TRANSACTION_LABELS).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Lease type */}
        <select
          value={filters.leaseType}
          onChange={(e) => update({ leaseType: e.target.value as Filters["leaseType"] })}
          className="h-9 rounded-lg border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 focus:border-blue-400 focus:outline-none"
        >
          <option value="">Type de bail</option>
          {Object.entries(LEASE_LABELS).map(([value, { label }]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>

        {/* Seats */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">Postes:</span>
          <input
            type="number"
            min={0}
            max={200}
            value={filters.seatsMin || ""}
            placeholder="Min"
            onChange={(e) => update({ seatsMin: parseInt(e.target.value) || 0 })}
            className="h-9 w-16 rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm text-center focus:border-blue-400 focus:outline-none"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            min={0}
            max={500}
            value={filters.seatsMax === 200 ? "" : filters.seatsMax}
            placeholder="Max"
            onChange={(e) => update({ seatsMax: parseInt(e.target.value) || 200 })}
            className="h-9 w-16 rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm text-center focus:border-blue-400 focus:outline-none"
          />
        </div>

        {/* Budget */}
        <div className="flex items-center gap-1.5">
          <span className="text-xs text-gray-500">Budget max:</span>
          <input
            type="number"
            min={0}
            step={500}
            value={filters.budgetMax === 50000 ? "" : filters.budgetMax}
            placeholder="€/mois"
            onChange={(e) => update({ budgetMax: parseInt(e.target.value) || 50000 })}
            className="h-9 w-24 rounded-lg border border-gray-200 bg-gray-50 px-2 text-sm text-center focus:border-blue-400 focus:outline-none"
          />
        </div>

        {/* Reset */}
        <button
          onClick={reset}
          className="h-9 rounded-lg px-3 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
        >
          Réinitialiser
        </button>
      </div>

      {/* Result count + sort */}
      <div className="flex items-center justify-between border-t border-gray-100 px-4 py-2">
        <p className="text-sm font-semibold text-gray-900">
          {resultCount} Offre{resultCount > 1 ? "s" : ""} de bureaux
        </p>
        <div className="flex items-center gap-3">
          <select className="text-sm text-gray-500 bg-transparent border-none focus:outline-none cursor-pointer">
            <option>Date de mise à jour</option>
            <option>Prix croissant</option>
            <option>Prix décroissant</option>
            <option>Surface</option>
          </select>
          <button className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors">
            🔔 Activer l&apos;alerte
          </button>
        </div>
      </div>
    </div>
  );
}
