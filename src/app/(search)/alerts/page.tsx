"use client";

import { useState } from "react";

const mockAlerts = [
  {
    id: "alert-001",
    name: "Bureaux Paris 8e-9e",
    criteria: "Bureaux, Bail Commercial, 20-40 postes, max 15 000 €/mois",
    frequency: "Quotidienne",
    active: true,
    matchCount: 12,
    createdAt: "2025-02-15",
  },
  {
    id: "alert-002",
    name: "Coworking Le Marais",
    criteria: "Coworking, 5-15 postes, Paris 3e/4e",
    frequency: "Hebdomadaire",
    active: true,
    matchCount: 5,
    createdAt: "2025-02-28",
  },
  {
    id: "alert-003",
    name: "Grands plateaux Ouest",
    criteria: "Bureaux, 50+ postes, Paris 16e/17e, Bail Commercial",
    frequency: "Quotidienne",
    active: false,
    matchCount: 3,
    createdAt: "2025-01-20",
  },
];

export default function AlertsPage() {
  const [alerts, setAlerts] = useState(mockAlerts);

  function toggleAlert(id: string) {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, active: !a.active } : a))
    );
  }

  return (
    <div className="mx-auto max-w-3xl p-6 lg:p-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Mes alertes</h1>
          <p className="mt-1 text-gray-600">
            Recevez des notifications quand de nouvelles offres correspondent à vos critères.
          </p>
        </div>
        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700">
          + Nouvelle alerte
        </button>
      </div>

      <div className="mt-8 space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-sm"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-semibold text-gray-900">
                  {alert.name}
                </h3>
                <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                  {alert.matchCount} offres
                </span>
              </div>
              <p className="mt-1 text-xs text-gray-500">{alert.criteria}</p>
              <p className="mt-1 text-xs text-gray-400">
                {alert.frequency} · Créée le {alert.createdAt}
              </p>
            </div>

            <div className="flex items-center gap-3">
              {/* Toggle */}
              <button
                onClick={() => toggleAlert(alert.id)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  alert.active ? "bg-blue-500" : "bg-gray-300"
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    alert.active ? "translate-x-6" : "translate-x-1"
                  }`}
                />
              </button>

              <button className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
