"use client";

import { useState } from "react";
import { LEASE_LABELS } from "@/lib/search-types";
import type { Office } from "@/lib/search-types";
import { cn } from "@/lib/utils";

interface OfferCardProps {
  office: Office;
  isHighlighted?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

export function OfferCard({ office, isHighlighted, onMouseEnter, onMouseLeave }: OfferCardProps) {
  const [imgIndex, setImgIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const lease = LEASE_LABELS[office.leaseType];

  const isVente = office.transactionType === "vente";

  return (
    <div
      className={cn(
        "group relative rounded-xl border bg-white transition-all",
        isHighlighted
          ? "border-blue-400 shadow-md ring-1 ring-blue-200"
          : "border-gray-200 hover:shadow-md"
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* Image carousel */}
      <div className="relative h-44 overflow-hidden rounded-t-xl bg-gray-100">
        <img
          src={office.images[imgIndex]}
          alt={office.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
        />

        {/* Carousel nav */}
        {office.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImgIndex((i) => (i - 1 + office.images.length) % office.images.length);
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-gray-700 opacity-0 shadow transition-opacity hover:bg-white group-hover:opacity-100"
            >
              ‹
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setImgIndex((i) => (i + 1) % office.images.length);
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-7 w-7 items-center justify-center rounded-full bg-white/80 text-gray-700 opacity-0 shadow transition-opacity hover:bg-white group-hover:opacity-100"
            >
              ›
            </button>
          </>
        )}

        {/* Photo counter */}
        <div className="absolute bottom-2 right-2 rounded-md bg-black/60 px-2 py-0.5 text-xs text-white">
          {imgIndex + 1}/{office.images.length}
        </div>

        {/* Badges */}
        <div className="absolute left-2 top-2 flex gap-1.5">
          <span className={cn("rounded-md px-2 py-0.5 text-xs font-medium", lease.color)}>
            {lease.label}
          </span>
          {office.offMarket && (
            <span className="rounded-md bg-gray-700 px-2 py-0.5 text-xs font-medium text-white">
              Off-market
            </span>
          )}
        </div>

        {/* Checkbox */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelected(!selected);
          }}
          className={cn(
            "absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded border-2 transition-colors",
            selected
              ? "border-blue-500 bg-blue-500 text-white"
              : "border-white/70 bg-white/50 text-transparent hover:border-blue-400"
          )}
        >
          ✓
        </button>
      </div>

      {/* Content */}
      <div className="p-3.5">
        <p className="text-xs text-gray-500">
          {office.address}, {office.district}
        </p>

        <div className="mt-2 flex items-baseline justify-between">
          <p className="text-lg font-bold text-gray-900">
            {isVente
              ? `${office.priceMonthly.toLocaleString("fr-FR")} €`
              : `${office.priceMonthly.toLocaleString("fr-FR")} €/mois`}
          </p>
          {!isVente && office.pricePerSqmYear > 0 && (
            <p className="text-xs text-gray-500">
              {office.pricePerSqmYear} €/m²/an
            </p>
          )}
        </div>

        <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600">
          <span className="flex items-center gap-1">
            📐 {office.surface} m²
          </span>
          <span className="flex items-center gap-1">
            👤 Env. {office.seats} postes
          </span>
          <span className="flex items-center gap-1">
            🏢 {office.floor}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
          <span>
            {office.availability === "immediate"
              ? "🟢 Disponible immédiatement"
              : office.availability === "after_agreement"
              ? "🟡 Après accord"
              : `📅 ${office.availability}`}
          </span>
          <span>{office.leaseDuration}</span>
        </div>
      </div>
    </div>
  );
}
