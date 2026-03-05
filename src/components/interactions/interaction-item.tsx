import { INTERACTION_TYPES } from "@/lib/constants";
import { formatDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import type { InteractionType } from "@/types";

interface InteractionItemProps {
  type: InteractionType;
  title: string;
  description: string | null;
  occurredAt: string;
  userName?: string | null;
}

export function InteractionItem({
  type,
  title,
  description,
  occurredAt,
  userName,
}: InteractionItemProps) {
  const config = INTERACTION_TYPES[type];

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-sm">
          {config.icon}
        </div>
        <div className="flex-1 border-l border-gray-200" />
      </div>
      <div className="flex-1 pb-6">
        <div className="flex items-center gap-2">
          <Badge className={config.color}>{config.label}</Badge>
          <span className="text-xs text-gray-500">{formatDateTime(occurredAt)}</span>
        </div>
        <p className="mt-1 text-sm font-medium text-gray-900">{title}</p>
        {description && (
          <p className="mt-1 whitespace-pre-wrap text-sm text-gray-600">
            {description}
          </p>
        )}
        {userName && (
          <p className="mt-1 text-xs text-gray-400">par {userName}</p>
        )}
      </div>
    </div>
  );
}
