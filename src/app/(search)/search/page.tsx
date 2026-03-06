"use client";

import { useState, useMemo, useCallback, useRef } from "react";
import { FilterBar } from "@/components/search/filter-bar";
import { OfferCard } from "@/components/search/offer-card";
import { OffersMap } from "@/components/search/offers-map";
import { mockOffices } from "@/lib/mock-search-data";
import { DEFAULT_FILTERS } from "@/lib/search-types";
import type { Filters } from "@/lib/search-types";

export default function SearchPage() {
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOffices = useMemo(() => {
    return mockOffices.filter((office) => {
      if (filters.location) {
        const loc = filters.location.toLowerCase();
        const match =
          office.address.toLowerCase().includes(loc) ||
          office.district.toLowerCase().includes(loc) ||
          office.title.toLowerCase().includes(loc);
        if (!match) return false;
      }
      if (filters.type && office.type !== filters.type) return false;
      if (filters.transactionType && office.transactionType !== filters.transactionType) return false;
      if (filters.leaseType && office.leaseType !== filters.leaseType) return false;
      if (filters.seatsMin > 0 && office.seats < filters.seatsMin) return false;
      if (filters.seatsMax < 200 && office.seats > filters.seatsMax) return false;
      if (filters.budgetMax < 50000 && office.priceMonthly > filters.budgetMax) return false;
      return true;
    });
  }, [filters]);

  const handleMarkerClick = useCallback((id: string) => {
    setHighlightedId(id);
    // Scroll to card
    const card = document.getElementById(`offer-${id}`);
    if (card && listRef.current) {
      card.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, []);

  return (
    <div className="flex h-full flex-col">
      <FilterBar
        filters={filters}
        onChange={setFilters}
        resultCount={filteredOffices.length}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Offers list */}
        <div
          ref={listRef}
          className="w-full overflow-y-auto p-4 lg:w-[55%]"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filteredOffices.length === 0 ? (
              <div className="col-span-2 flex flex-col items-center justify-center py-16 text-gray-500">
                <span className="text-4xl">🔍</span>
                <p className="mt-3 text-lg font-medium">Aucune offre trouvée</p>
                <p className="text-sm">Essayez de modifier vos filtres</p>
              </div>
            ) : (
              filteredOffices.map((office) => (
                <div key={office.id} id={`offer-${office.id}`}>
                  <OfferCard
                    office={office}
                    isHighlighted={highlightedId === office.id}
                    onMouseEnter={() => setHighlightedId(office.id)}
                    onMouseLeave={() => setHighlightedId(null)}
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Map */}
        <div className="hidden lg:block lg:w-[45%]">
          <OffersMap
            offices={filteredOffices}
            highlightedId={highlightedId}
            onMarkerHover={setHighlightedId}
            onMarkerClick={handleMarkerClick}
          />
        </div>
      </div>
    </div>
  );
}
