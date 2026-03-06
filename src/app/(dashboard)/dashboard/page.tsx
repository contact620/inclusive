import { StatCard } from "@/components/dashboard/stat-card";
import { StatusChart } from "@/components/dashboard/status-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DEMO_MODE,
  mockClients,
  mockInteractions,
  mockActivityLog,
} from "@/lib/mock-data";

async function getDashboardData() {
  if (DEMO_MODE) {
    const counts: Record<string, number> = {};
    mockClients.forEach((c) => {
      counts[c.status] = (counts[c.status] || 0) + 1;
    });
    const statusData = Object.entries(counts).map(([status, count]) => ({
      status,
      count,
    }));

    return {
      totalClients: mockClients.length,
      totalInteractions: mockInteractions.length,
      statusData,
      activities: mockActivityLog,
    };
  }

  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();

  const [clientsResult, interactionsResult, activityResult] = await Promise.all([
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase.from("interactions").select("*", { count: "exact", head: true }),
    supabase
      .from("activity_log")
      .select("*, profiles(id, full_name)")
      .order("created_at", { ascending: false })
      .limit(10),
  ]);

  const { data: clientsData } = await supabase.from("clients").select("status");
  const counts: Record<string, number> = {};
  clientsData?.forEach((c) => {
    counts[c.status] = (counts[c.status] || 0) + 1;
  });
  const statusData = Object.entries(counts).map(([status, count]) => ({
    status,
    count,
  }));

  return {
    totalClients: clientsResult.count ?? 0,
    totalInteractions: interactionsResult.count ?? 0,
    statusData,
    activities: activityResult.data ?? [],
  };
}

export default async function DashboardPage() {
  const { totalClients, totalInteractions, statusData, activities } =
    await getDashboardData();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Tableau de bord</h1>
        <Link href="/clients/new">
          <Button>+ Nouveau client</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          label="Total clients"
          value={totalClients}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
            </svg>
          }
        />
        <StatCard
          label="Interactions"
          value={totalInteractions}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
            </svg>
          }
        />
        <StatCard
          label="Clients actifs"
          value={statusData.find((s) => s.status === "active")?.count ?? 0}
          icon={
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatusChart data={statusData} total={totalClients} />
        <RecentActivity activities={activities} />
      </div>
    </div>
  );
}
