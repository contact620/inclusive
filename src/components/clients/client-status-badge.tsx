import { Badge } from "@/components/ui/badge";
import { CLIENT_STATUSES, type ClientStatus } from "@/lib/constants";

interface ClientStatusBadgeProps {
  status: ClientStatus;
}

export function ClientStatusBadge({ status }: ClientStatusBadgeProps) {
  const config = CLIENT_STATUSES[status];
  return <Badge className={config.color}>{config.label}</Badge>;
}
