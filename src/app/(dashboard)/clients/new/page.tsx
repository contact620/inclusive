import { ClientForm } from "@/components/clients/client-form";

export default function NewClientPage() {
  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold text-gray-900">Nouveau client</h1>
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <ClientForm mode="create" />
      </div>
    </div>
  );
}
