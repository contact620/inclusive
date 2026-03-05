import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CLIENT_STATUSES } from "@/lib/constants";

interface StatusChartProps {
  data: { status: string; count: number }[];
  total: number;
}

export function StatusChart({ data, total }: StatusChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Répartition des clients</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item) => {
            const config = CLIENT_STATUSES[item.status as keyof typeof CLIENT_STATUSES];
            const percentage = total > 0 ? Math.round((item.count / total) * 100) : 0;

            return (
              <div key={item.status}>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">
                    {config?.label ?? item.status}
                  </span>
                  <span className="text-gray-500">
                    {item.count} ({percentage}%)
                  </span>
                </div>
                <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
