import { getClients } from "@/actions/clients";
import { ClientTable } from "@/components/clients/client-table";
import type { ClientStatus } from "@/types";

interface Props {
  searchParams: Promise<{
    search?: string;
    status?: ClientStatus;
    page?: string;
  }>;
}

export default async function ClientsPage({ searchParams }: Props) {
  const params = await searchParams;
  const { clients, total, page, totalPages } = await getClients({
    search: params.search,
    status: params.status,
    page: params.page ? parseInt(params.page) : 1,
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Clients</h1>
      <ClientTable
        clients={clients}
        total={total}
        page={page}
        totalPages={totalPages}
      />
    </div>
  );
}
