import { PROJECT_STAGES } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { ProjectStage } from "@/types";

interface ProjectStageTrackerProps {
  currentStage: ProjectStage;
}

export function ProjectStageTracker({ currentStage }: ProjectStageTrackerProps) {
  const currentIndex = PROJECT_STAGES.findIndex((s) => s.key === currentStage);

  return (
    <div className="w-full">
      {/* Desktop */}
      <div className="hidden sm:block">
        <div className="flex items-center justify-between">
          {PROJECT_STAGES.map((stage, index) => {
            const isCompleted = index < currentIndex;
            const isCurrent = index === currentIndex;
            const isPending = index > currentIndex;

            return (
              <div key={stage.key} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  {index > 0 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1",
                        isCompleted || isCurrent ? "bg-blue-500" : "bg-gray-200"
                      )}
                    />
                  )}
                  <div
                    className={cn(
                      "flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full text-sm transition-all",
                      isCompleted && "bg-blue-500 text-white",
                      isCurrent && "bg-blue-500 text-white ring-4 ring-blue-100",
                      isPending && "bg-gray-200 text-gray-500"
                    )}
                  >
                    {isCompleted ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    ) : (
                      <span>{stage.icon}</span>
                    )}
                  </div>
                  {index < PROJECT_STAGES.length - 1 && (
                    <div
                      className={cn(
                        "h-0.5 flex-1",
                        isCompleted ? "bg-blue-500" : "bg-gray-200"
                      )}
                    />
                  )}
                </div>
                <span
                  className={cn(
                    "mt-2 text-xs font-medium text-center",
                    isCurrent ? "text-blue-700" : isCompleted ? "text-blue-600" : "text-gray-400"
                  )}
                >
                  {stage.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile */}
      <div className="space-y-2 sm:hidden">
        {PROJECT_STAGES.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={stage.key}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2",
                isCurrent && "bg-blue-50",
                isCompleted && "opacity-70"
              )}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm",
                  isCompleted && "bg-blue-500 text-white",
                  isCurrent && "bg-blue-500 text-white",
                  !isCompleted && !isCurrent && "bg-gray-200 text-gray-400"
                )}
              >
                {isCompleted ? "✓" : stage.icon}
              </div>
              <span
                className={cn(
                  "text-sm font-medium",
                  isCurrent ? "text-blue-700" : isCompleted ? "text-gray-600" : "text-gray-400"
                )}
              >
                {stage.label}
              </span>
              {isCurrent && (
                <Badge className="ml-auto bg-blue-100 text-blue-700 text-xs px-2 py-0.5 rounded-full">
                  En cours
                </Badge>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={className}>{children}</span>;
}
