"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ClientStatusBadge } from "./client-status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { CLIENT_STATUSES } from "@/lib/constants";
import { formatDate } from "@/lib/utils";
import { useDebounce } from "@/hooks/use-debounce";
import type { Client, ClientStatus } from "@/types";
import { useEffect } from "react";

interface ClientTableProps {
  clients: Client[];
  total: number;
  page: number;
  totalPages: number;
}

const filterOptions = [
  { value: "", label: "Tous les statuts" },
  ...Object.entries(CLIENT_STATUSES).map(([value, config]) => ({
    value,
    label: config.label,
  })),
];

export function ClientTable({ clients, total, page, totalPages }: ClientTableProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const debouncedSearch = useDebounce(search);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearch) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
    params.delete("page");
    router.push(`/clients?${params.toString()}`);
  }, [debouncedSearch, router, searchParams]);

  function handleStatusFilter(e: React.ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("status", e.target.value);
    } else {
      params.delete("status");
    }
    params.delete("page");
    router.push(`/clients?${params.toString()}`);
  }

  function handlePageChange(newPage: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`/clients?${params.toString()}`);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="max-w-xs flex-1">
            <Input
              placeholder="Rechercher un client..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select
            options={filterOptions}
            defaultValue={searchParams.get("status") ?? ""}
            onChange={handleStatusFilter}
            className="w-40"
          />
        </div>
        <Link href="/clients/new">
          <Button>+ Nouveau client</Button>
        </Link>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-700">Nom</th>
              <th className="hidden px-4 py-3 font-medium text-gray-700 md:table-cell">Email</th>
              <th className="hidden px-4 py-3 font-medium text-gray-700 lg:table-cell">Entreprise</th>
              <th className="px-4 py-3 font-medium text-gray-700">Statut</th>
              <th className="hidden px-4 py-3 font-medium text-gray-700 sm:table-cell">Créé le</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {clients.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Aucun client trouvé
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr
                  key={client.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => router.push(`/clients/${client.id}`)}
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {client.name}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-600 md:table-cell">
                    {client.email || "—"}
                  </td>
                  <td className="hidden px-4 py-3 text-gray-600 lg:table-cell">
                    {client.company || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <ClientStatusBadge status={client.status as ClientStatus} />
                  </td>
                  <td className="hidden px-4 py-3 text-gray-600 sm:table-cell">
                    {formatDate(client.created_at)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {total} client{total > 1 ? "s" : ""} au total
          </p>
          <div className="flex gap-2">
            <Button
              variant="secondary"
              size="sm"
              disabled={page <= 1}
              onClick={() => handlePageChange(page - 1)}
            >
              Précédent
            </Button>
            <span className="flex items-center px-3 text-sm text-gray-600">
              {page} / {totalPages}
            </span>
            <Button
              variant="secondary"
              size="sm"
              disabled={page >= totalPages}
              onClick={() => handlePageChange(page + 1)}
            >
              Suivant
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
