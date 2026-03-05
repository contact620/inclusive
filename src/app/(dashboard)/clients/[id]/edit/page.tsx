import { getClientById } from "@/actions/clients";
import { ClientForm } from "@/components/clients/client-form";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function EditClientPage({ params }: Props) {
  const { id } = await params;

  let client;
  try {
    client = await getClientById(id);
  } catch {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">
        Modifier : {client.name}
      </h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <ClientForm mode="edit" defaultValues={client} />
      </div>
    </div>
  );
}
