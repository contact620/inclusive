"use client";

import { useEffect, useRef } from "react";
import type { Office } from "@/lib/search-types";

interface OffersMapProps {
  offices: Office[];
  highlightedId: string | null;
  onMarkerHover: (id: string | null) => void;
  onMarkerClick: (id: string) => void;
}

export function OffersMap({ offices, highlightedId, onMarkerHover, onMarkerClick }: OffersMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());

  useEffect(() => {
    if (!mapRef.current) return;
    // Prevent double-init in React Strict Mode
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
      markersRef.current.clear();
    }

    const initMap = async () => {
      const L = (await import("leaflet")).default;

      const map = L.map(mapRef.current!, {
        center: [48.8566, 2.3522],
        zoom: 13,
        zoomControl: true,
      });

      L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
        maxZoom: 19,
      }).addTo(map);

      mapInstanceRef.current = map;

      // Add markers
      offices.forEach((office) => {
        const priceLabel = office.transactionType === "vente"
          ? `${(office.priceMonthly / 1000).toFixed(0)}K€`
          : `${(office.priceMonthly / 1000).toFixed(1)}K€`;

        const icon = L.divIcon({
          className: "custom-marker",
          html: `<div class="marker-pill" data-id="${office.id}">${priceLabel}</div>`,
          iconSize: [0, 0],
          iconAnchor: [30, 15],
        });

        const marker = L.marker([office.lat, office.lng], { icon }).addTo(map);

        marker.on("mouseover", () => onMarkerHover(office.id));
        marker.on("mouseout", () => onMarkerHover(null));
        marker.on("click", () => onMarkerClick(office.id));

        markersRef.current.set(office.id, marker);
      });

      // Fit bounds
      if (offices.length > 0) {
        const bounds = L.latLngBounds(offices.map((o) => [o.lat, o.lng]));
        map.fitBounds(bounds, { padding: [30, 30] });
      }
    };

    initMap();

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersRef.current.clear();
      }
    };
  }, []);

  // Highlight marker on hover
  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      if (!el) return;
      const pill = el.querySelector(".marker-pill") as HTMLElement;
      if (!pill) return;

      if (id === highlightedId) {
        pill.classList.add("marker-highlighted");
      } else {
        pill.classList.remove("marker-highlighted");
      }
    });
  }, [highlightedId]);

  return (
    <>
      <style jsx global>{`
        .custom-marker {
          background: none !important;
          border: none !important;
        }
        .marker-pill {
          background: white;
          color: #1f2937;
          font-size: 12px;
          font-weight: 600;
          padding: 4px 10px;
          border-radius: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.15);
          border: 2px solid white;
          white-space: nowrap;
          cursor: pointer;
          transition: all 0.15s ease;
        }
        .marker-pill:hover,
        .marker-highlighted {
          background: #2563eb;
          color: white;
          border-color: #2563eb;
          transform: scale(1.15);
          z-index: 1000 !important;
        }
      `}</style>
      <div ref={mapRef} className="h-full w-full" />
    </>
  );
}
